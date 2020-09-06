module.exports = function (io) {
    var express = require('express');
    var router = express.Router();
    var PreparationController = require('../controllers/preparation.controller')(io)

    router.get('/', PreparationController.listAction);
    router.put('/:id', PreparationController.updateStatusAction);

    return router
}
