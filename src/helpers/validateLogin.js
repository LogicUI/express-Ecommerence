const joi = require('@hapi/joi');

const validationLogin = (data) => {
  const schema = {
    email: joi
      .string()
      .min(6)
      .email()
      .required(),
    password: joi
      .string()
      .min(8)
      .required()
  };
  return joi.validate(data, schema);
};
module.exports = validationLogin;
