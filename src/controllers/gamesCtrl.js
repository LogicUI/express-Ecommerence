const Games = require('../model/games');

const findAll = async (req, res) => {
  const games = await Games.find();
  res.json(games);
};

const updateOne = async (req, res) => {
  const { title, quantity } = req.body;

  const item = await Games.findOne({ title });
  const newQuantity = item.quantity - quantity;
  const update = { quantity: newQuantity };
  await Games.findOneAndUpdate({ title }, update);
  res.sendStatus(200);
};

module.exports = {
  findAll,
  updateOne
};
