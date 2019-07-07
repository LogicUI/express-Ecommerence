const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    min: 6
  },
  name: {
    type: String,
    required: true,
    min: 6
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', userSchema);

