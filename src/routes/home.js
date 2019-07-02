const express = require('express');
const router = express.Router();
const homeJson = require('../data/home');

router.get('/', (req, res) => {
  res.json(homeJson);
});

module.exports = router;
