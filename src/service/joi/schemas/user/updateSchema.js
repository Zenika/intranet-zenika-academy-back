const Joi = require('@hapi/joi');

const update = Joi.object({

  firstName: Joi.string(),

  lastName: Joi.string(),

  email: Joi.string(),

  role: Joi.number(),
}).required();

module.exports = update;
