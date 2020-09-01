var express = require('express');
var router = express.Router();
var TableController = require('../controllers/table.controller')

router.get('/',  TableController.listAction);
router.get('/:id', TableController.viewAction);
router.post('/', TableController.createAction);
router.post('/:id', TableController.addFoodAction);
router.put('/:id', TableController.editAction); 
router.delete('/:id', TableController.deleteAction); 

module.exports = router;
