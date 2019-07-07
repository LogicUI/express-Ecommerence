const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usersCtrl');

router.post('/register', ctrl.createOne);
router.post('/login', ctrl.findOne);

module.exports = router;
