const update = require("./updateSchema");
const create = require("./createSchema");
const signIn = require("./signInSchema");

const userSchemas = {
  update,
  create,
  signIn
};

module.exports = userSchemas;
