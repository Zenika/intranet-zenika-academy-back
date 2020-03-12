const Joi = require('@hapi/joi');

const update = Joi.object({
  id: Joi.number()
    .integer()
    .required(),

  type: Joi.number()
    .integer()
    .required(),

  title: Joi.string()
    .required(),

  content: Joi.array(),

  updatedAt: Joi.string(),

  createdAt: Joi.string(),
}).required();

module.exports = update;
