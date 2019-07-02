const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const dbUrl = global.__MONGO_URI__ || process.env.DB_CONNECT;
mongoose.connect(dbUrl, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to db');
});
