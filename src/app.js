const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
require('./db');
const gamesRoute = require('./routes/games');
const consoleRoute = require('./routes/consoles');
const preOrderRoute = require('./routes/preOrders');
const videosRoute = require('./routes/videos');
const homesRoute = require('./routes/home');

app.use(express.json());
app.use(cors());

app.use('/games', gamesRoute);
app.use('/consoles', consoleRoute);
app.use('/preOrders', preOrderRoute);
app.use('/videos', videosRoute);
app.use('/home', homesRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});


module.exports = app;