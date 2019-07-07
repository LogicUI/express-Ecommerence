const bycrypt = require('bcryptjs');

module.exports.hashPassword = async (password) => {
  const salt = await bycrypt.genSalt(10);
  const hashPassword = await bycrypt.hash(password, salt);
  return hashPassword;
};

module.exports.decrypt = async (pass, hashPassword) => {
  const validatePass = await bcrypt.compare(pass, hashPassword);
  return validatePass;
};
