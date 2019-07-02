const express = require('express');
const router = express.Router();
const preOrders = require('../model/preOrder');

router.get('/', async (req, res) => {
  const preOrdersData = await preOrders.find();
  res.json(preOrdersData);
});

module.exports = router;
