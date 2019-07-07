const Users = require('../model/user');
const handleUserCreate = require('../helpers/handleUserCreate');
const validation = require('../helpers/validation');
const hashHelper = require('../helpers/hashPass');

const createOne = async (req, res, next) => {
  // validate the data before creating user

  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  // check if email taken

  const emailExist = await Users.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('This Email Already Exist');

  // create user model
  const newUser = await handleUserCreate(req.body);
  const user = new Users(newUser);
  await user.save();
  res.status(201).send('Sucessfully Registered!');
};

const findOne = async (req, res, next) => {
  try {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('email does not exist');

    const validatePass = await hashHelper.decrypt(
      req.body.password,
      user.password
    );
    if (!validatePass) return res.status(400).send('Invalid password');

    res.status(200).send('sucessfully login!');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createOne,
  findOne
};
