var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user.controller')

router.get('/',  UserController.listAction);
router.get('/:id', UserController.viewAction);
router.post('/', UserController.createAction);
router.put('/:id', UserController.editAction); 
router.delete('/:id', UserController.deleteAction); 

module.exports = router;
