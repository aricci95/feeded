var express = require('express');
var router = express.Router();
var PreparationController = require('../controllers/preparation.controller')

router.get('/',  PreparationController.listAction);
router.put('/:id', PreparationController.updateStatusAction);

module.exports = router;
