const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gamesSchema = Schema({
  image: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  platform: { type: String, required: true },
  promo: { type: Boolean, required: true }
});

module.exports = mongoose.model('game', gamesSchema);
