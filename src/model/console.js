const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consoleSchema = Schema({
  image: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  type:  {type:String,required:true},
  platform: { type: String, required: true },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('console', consoleSchema);
