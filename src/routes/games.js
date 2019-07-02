const express = require('express');
const router = express.Router();
const Games = require('../model/games');

router.get('/', async (req, res) => {
  const games = await Games.find();
  res.json(games);
});

module.exports = router;
