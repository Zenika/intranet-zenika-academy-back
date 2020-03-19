const Joi = require("@hapi/joi");

const create = Joi.object({
  firstName: Joi.string().required(),

  lastName: Joi.string().required(),

  email: Joi.string().required(),

  promotionId: Joi.number(),

  role: Joi.string().required()
}).required();

module.exports = create;
