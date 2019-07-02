const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preOrderSchema = Schema({
  image: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  platform: { type: String, required: true },
  release: { type: String, required: true },
  preOrderPrice: { type: String }
});

module.exports = mongoose.model('preOrder', preOrderSchema);
