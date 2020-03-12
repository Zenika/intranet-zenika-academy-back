const bcrypt = require('bcryptjs');
const { Users, Promotions, Programs } = require('../../models');

const saltRounds = 10;

/**
 * Allows to Update the promotionId of a promotion teachers to Null
 * @param {*} promoId
 */
const updateTeachersToNull = async (promoId) => {
  const teachersToRemove = await Users.findAll({
    where: {
      promotionId: promoId,
      role: 2,
    },
    raw: true,
  });
  const ids = teachersToRemove.map((t) => t.id);

  await Users.update(
    { promotionId: null },
    { where: { id: ids } },
  );
};

/**
 * Update the promotionId of teachers
 * @param {*} teachers Array of teachers from req.body
 * @param {*} promoId PromotionId to set for each teacher
 */
const updateTeachersWithPromoId = async (teachers, promoId) => {
  const ids = teachers.map((t) => t.id);

  await Users.update(
    { promotionId: promoId },
    { where: { id: ids } },
  );
};

/**
 * Allows to update the promotionId of a promotion students to Null
 * @param {*} promoId
 */
const updateStudentsToNull = async (promoId) => {
  const studentsToRemove = await Users.findAll({
    where: {
      promotionId: promoId,
      role: 3,
    },
    raw: true,
  });

  const ids = studentsToRemove.map((t) => t.id);
  await Users.update(
    { promotionId: null },
    { where: { id: ids } },
  );
};

/**
 * Allows to update the promotionId of existing students
 * or create new ones with the promotionId if they don't exist
 * @param {*} students Array of students
 * @param {*} promoId promotion id to set
 */
const upsertNewStudents = async (students, promoId) => {
  await Promise.all(
    students.map(async (student) => {
      const foundStudent = await Users.findOne({ where: { email: student.email } });
      // UNKNOWN STUDENT CREATION//
      if (foundStudent === null) {
        const hash = await bcrypt.hash('student', saltRounds);
        const newStudent = {
          ...student,
          promotionId: promoId,
          password: hash,
          role: 3,
        };
        await Users.create(newStudent);
      }
      // EXISTING STUDENTS UPDATE//
      if (foundStudent) {
        await Users.update(
          { promotionId: promoId },
          { where: { id: foundStudent.id } },
        );
      }
    }),
  );
};


module.exports = {
  getAllPromotion: (req, res) => Promotions.findAll({ raw: true })
    .then((content) => res.send(content))
    .catch((e) => res.status(400).send(e)),

  getPromotionById: (req, res) => Promotions.findOne({ where: { id: res.locals.promotion_id } })
    .then((promotionCreated) => res.status(200).send(promotionCreated))
    .catch((e) => res.status(400).send(e)),

  getPromotionDetailsById: (req, res) => Promotions
    .findOne({ where: { id: res.locals.promotion_id } })
    .then((promotion) => {
      const result = Promise.all([
        Programs.findOne({ where: { id: promotion.programId } }),
        Users.findAll({ where: { promotionId: promotion.id } }),
      ]).then((promiseAllResult) => [promotion, promiseAllResult]);
      return result;
    })
    .then((result) => {
      const promotionsDetail = {
        promotion: result[0],
        users: result[1][1],
        program: result[1][0],
      };
      return promotionsDetail;
    })
    .then((promotionDetails) => res.status(200).send(promotionDetails))
    .catch((e) => res.status(400).send(e)),

  promotionCreate: async (req, res) => {
    const { promoData, teachersToUpsert } = req.body;
    try {
      const promo = await Promotions.create(promoData);
      await teachersToUpsert.map((teacher) => Users.update(
        { promotionId: promo.id },
        { where: { id: teacher.id } },
      ));

      return res.status(201).send(promo);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  promotionUpdate: async (req, res) => {
    const { promoData, users } = req.body;
    const id = res.locals.promotion_id;
    try {
      await updateTeachersToNull(id);
      await updateTeachersWithPromoId(users.teachersToUpsert, id);
      await updateStudentsToNull(id);
      await upsertNewStudents(users.students, id);
      const promoUpdated = await Promotions.update({ ...promoData }, { where: { id } });
      return res.status(201).send(promoUpdated);
    } catch (error) {
      return res.status(409).json(error);
    }
  },

  promotionDelete: async (req, res) => {
    try {
      const users = await Users
        .findAll({ where: { promotionId: res.locals.promotion_id }, raw: true });
      if (users instanceof Array && users.length > 0) {
        await Promise.all(users.map(async (user) => {
          if (user.role === 3) {
            await Users.destroy({ where: { id: user.id } });
          } else if (user.role === 2) {
            await Users.update(
              { promotionId: null },
              { where: { id: user.id } },
            );
          }
        }));
      }
      await Promotions.destroy({ where: { id: res.locals.promotion_id } });
      return res.status(200).send('Deleted');
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
