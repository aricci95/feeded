var express = require('express');
var router = express.Router();
var FoodController = require('../controllers/food.controller')

router.get('/',  FoodController.listAction);
router.get('/:id', FoodController.viewAction);
router.post('/', FoodController.createAction);
router.put('/:id', FoodController.editAction); 
router.delete('/:id', FoodController.deleteAction); 

module.exports = router;
