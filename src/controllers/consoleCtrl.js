const Consoles = require('../model/console');

const findAll = async (req, res) => {
  const consoleData = await Consoles.find();
  res.json(consoleData);
};

const updateOne = async (req, res) => {

  const { title, quantity } = req.body;
  const item = await Consoles.findOne({ title });

  const newQuantity = item.quantity - quantity;
  const update = { quantity: newQuantity };
  await Consoles.findOneAndUpdate({ title }, update);
  res.sendStatus(200);
};

module.exports = {
  findAll,
  updateOne
};
