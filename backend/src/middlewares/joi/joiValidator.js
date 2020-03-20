const Joi = require('@hapi/joi');

module.exports = {
  joiObjectValidator: (schema, property) => (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      res.locals[property] = value;
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      res.status(422).json({ error: message });
    }
  },

  joiIdValidator: (property) => (req, res, next) => {
    const schema = Joi.object({
      id: Joi.number()
        .integer()
        .required(),
    });
    const { error, value } = schema.validate({
      id: parseInt(req.params[property], 10),
    });
    const valid = error == null;

    if (valid) {
      res.locals[property] = value.id;
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      res.status(422).json({ error: message });
    }
  },
};
