const Joi = require('@hapi/joi');

const create = Joi.object({

  email: Joi.string()
    .required(),

  password: Joi.string()
    .required(),

}).required();

module.exports = create;
