const Joi = require('@hapi/joi');

const update = Joi.object({
  id: Joi.number()
    .integer()
    .required(),

  title: Joi.string().alphanum(),

  link: Joi.string().alphanum(),

  description: Joi.string().alphanum(),
}).required();

module.exports = update;
