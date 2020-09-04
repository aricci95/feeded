module.exports = function (io) {
    var module = {}
    var PreparationService = require('../services/preparation.service')(io)
    var User = require('../models/user.model')
    const url = require('url');
    const globals = require('../consts')

    module.listAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        let { filter } = url.parse(req.url, true).query

        if (!currentUser || currentUser.role > globals.ROLE_USER) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }

        try {
            var tables = await PreparationService.getAll(currentUser, filter)
            return res.status(200).json(tables);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    module.updateStatusAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        let { status, foodIds } = req.body

        if (!currentUser || currentUser._id === req.params.id || currentUser.role > globals.ROLE_USER) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }

        try {
            var table = await PreparationService.updateStatus(req.params.id, foodIds, status)

            return res.status(200).json(table);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    return module
}