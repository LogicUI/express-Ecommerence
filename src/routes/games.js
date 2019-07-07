const express = require('express');
const router = express.Router();

const Ctrl = require('../controllers/gamesCtrl');

router.get('/', Ctrl.findAll);
router.put('/update', Ctrl.updateOne);


module.exports = router;
