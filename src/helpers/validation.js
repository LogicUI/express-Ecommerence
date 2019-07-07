const joi = require('@hapi/joi');

const validation = (data) => {
  const schema = {
    email: joi
      .string()
      .min(6)
      .email()
      .required(),
    password: joi
      .string()
      .min(8)
      .required(),
    name: joi
      .string()
      .required()
  };
  return joi.validate(data, schema);
};

module.exports = validation;
