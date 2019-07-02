const express = require('express');
const router = express.Router();
const Videos = require('../model/videos');

router.get('/', async (req, res) => {
  const videoData = await Videos.find();
  res.json(videoData);
});

module.exports = router;
