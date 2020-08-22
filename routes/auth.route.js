var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/auth.controller')

router.post('/login', AuthController.loginAction);

module.exports = router;