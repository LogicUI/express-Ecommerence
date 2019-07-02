const express = require('express');
const router = express.Router();
const Consoles = require('../model/console');

router.get('/', async (req, res) => {
  const consoleData = await Consoles.find();
  res.json(consoleData);
});

module.exports = router;
