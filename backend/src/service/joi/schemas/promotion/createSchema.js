const Joi = require("@hapi/joi");

const create = Joi.object({
  title: Joi.string()
    .alphanum()
    .required(),

  city: Joi.string()
    .alphanum()
    .required(),

  programId: Joi.string()
    .alphanum()
    .required(),

  startDate: Joi.string()
    .alphanum()
    .required(),

  endDate: Joi.string()
    .alphanum()
    .required()
}).required();

module.exports = create;
