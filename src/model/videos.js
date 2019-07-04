const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = Schema({
  videoLink: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('video', videoSchema);
