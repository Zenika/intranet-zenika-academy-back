const { Programs } = require('../../models');

function containObject(array) {
  return array.some((val) => val instanceof Object);
}

function containIds(array) {
  return array.some((val) => typeof val === 'number');
}

function createObject(programElement) {
  return Programs.create(programElement).then((contentCreated) =>
    contentCreated.get('id'),
  );
}

function updateObject(programElement) {
  const toUpdate = { ...programElement };
  // sort content to get program's element in the right order
  toUpdate.content.sort((a, b) => a - b);
  return Programs.update(
    { title: toUpdate.title, content: toUpdate.content },
    { where: { id: toUpdate.id } },
  );
}

// In this controller we use a lot of recursive function because we only got one table
// in database called "program" where we store all the program content
// content are differentiate by type and we store reference
// to other content by a string of ids in database

async function recursiveProgramCreate(programElement) {
  const copy = { ...programElement };
  if (
    programElement.content instanceof Array &&
    containObject(programElement.content)
  ) {
    await Promise.all(
      programElement.content.map(async (node) => {
        const id = await recursiveProgramCreate(node);
        copy.content.push(id);
      }),
    );
  }
  // remove the element from content and only keep his id that we get after creation
  const cleanList = {
    ...copy,
    content: copy.content.filter((node) => typeof node === 'number'),
  };

  // If the element already exist, we only want to update his content and title
  if (programElement.id) {
    await updateObject(cleanList);
    return programElement.id;
  }
  const id = await createObject(cleanList);
  return id;
}

// Create a program object tree from database object
async function createProgramObject(program) {
  const list = { ...program };
  if (program.content instanceof Array && containIds(program.content)) {
    await Promise.all(
      program.content.map(async (node) => {
        // if node is an id, we get it from database
        if (typeof node === 'number' && node > 0) {
          const newItemArray = await Programs.findAll({
            where: { id: node },
            raw: true,
          });
          // transform string of id into an array of ids
          newItemArray[0].content = newItemArray[0].content.split(';');
          const cleanItem = {
            ...newItemArray[0],
            content: newItemArray[0].content.map((id) => parseInt(id, 10)),
          };
          const newObject = await createProgramObject(cleanItem);
          newObject.content.sort((a, b) => a.id - b.id);
          list.content.push(newObject);
        }
      }),
    );
  }
  // remove the ids from content and only keep the elements that we fetch using the ids
  // and sort the content
  return {
    ...list,
    content: list.content
      .filter((node) => typeof node !== 'number')
      .sort((a, b) => a.id - b.id),
  };
}

async function recursiveProgramDelete(list) {
  if (list.content instanceof Array && containObject(list.content)) {
    await Promise.all(
      list.content.map(async (node) => {
        await recursiveProgramDelete(node);
      }),
    );
  }
  await Programs.destroy({ where: { id: list.id } });
}

async function recursiveDeleteOnUpdate(oldElement, updatedProgram) {
  // If the element got no content, there's nothing to delete.
  if (
    oldElement.content instanceof Array &&
    containObject(oldElement.content)
  ) {
    oldElement.content.map(async (node) => {
      if (containObject(updatedProgram.content)) {
        // Compare the element in the old program and the updated program to find
        // if we deleted it or not
        const itStay = updatedProgram.content.findIndex(
          (e2) => node.id === e2.id,
        );
        if (itStay === -1) await recursiveProgramDelete(node);
        // if the old element is not deleted, re-call the function to check in his content
        else if (containObject(node.content)) {
          await recursiveDeleteOnUpdate(node, updatedProgram.content[itStay]);
        }
      } else await recursiveProgramDelete(node);
    });
  }
}

// Clean the program object we get from Database
function cleanProgramObject(programCreated) {
  if (programCreated[0].content) {
    // transform string of id into an array of ids
    const arrayId = programCreated[0].content.split(';');
    const cleanItem = {
      ...programCreated[0],
      content: arrayId.map((id) => parseInt(id, 10)),
    };
    return createProgramObject(cleanItem);
  }
  return programCreated[0];
}

module.exports = {
  programUpdate: (req, res) => {
    const updatedProgram = res.locals.programs;
    const id = res.locals.program_id;
    if (id !== updatedProgram.id)
      res.status(400).send({ error: 'Id ne correspond pas au programme' });
    Programs.findAll({ where: { id }, raw: true })
      .then((programCreated) => cleanProgramObject(programCreated))
      .then((oldProgram) => recursiveDeleteOnUpdate(oldProgram, updatedProgram))
      .then(() => recursiveProgramCreate(updatedProgram))
      .then(() => res.status(200).send('Updated'))
      .catch((e) => res.status(400).send({ error: e.message }));
  },

  getAllPrograms: (req, res) =>
    Programs.findAll({ raw: false })
      .then((content) => res.send(content))
      .catch((e) => res.status(400).send({ error: e.message })),

  getProgramById: (req, res) =>
    Programs.findOne({ where: { id: res.locals.program_id } })
      .then((programCreated) => res.status(200).send(programCreated))
      .catch((e) => res.status(400).send({ error: e.message })),

  getProgramContentById: (req, res) =>
    Programs.findAll({ where: { id: res.locals.program_id }, raw: true })
      .then((programCreated) => cleanProgramObject(programCreated))
      .then((programCleaned) => res.status(200).send(programCleaned))
      .catch((e) => res.status(400).send({ error: e.message })),

  programCreate: (req, res) =>
    recursiveProgramCreate(res.locals.programs)
      .then(() => res.status(201).send({ message: 'Created' }))
      .catch((e) => res.status(400).send({ error: e.message })),

  programDelete: (req, res) =>
    Programs.findAll({ where: { id: res.locals.program_id }, raw: true })
      .then((programCreated) => cleanProgramObject(programCreated))
      .then((toDelete) => recursiveProgramDelete(toDelete))
      .then(() => res.status(200).send('Deleted'))
      .catch((e) => res.status(400).send({ error: e.message })),
};
