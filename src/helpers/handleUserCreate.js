const hashHelper = require('./hashPass');

const handleUserCreate = async ({ email, name, password }) => {
  const hashPass = await hashHelper.hashPassword(password);
  const user = { email, name, password: hashPass };
  return user;
};

module.exports = handleUserCreate;
