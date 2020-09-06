module.exports = function (io) {
    var express = require('express');
    var router = express.Router();
    var TableController = require('../controllers/table.controller')(io)

    router.get('/', TableController.listAction);
    router.get('/:id', TableController.viewAction);
    router.post('/', TableController.createAction);
    router.put('/:id', TableController.editAction);
    router.delete('/:id', TableController.deleteAction);
    router.post('/:id/submit', TableController.submitAction);

    router.post('/:id', TableController.addFoodAction);
    router.put('/:id/:foodId', TableController.editFoodAction);
    router.delete('/:id/:foodId', TableController.deleteFoodAction);

    return router
}
