module.exports = function (io) {
    var module = {}
    var TableService = require('../services/table.service')(io)
    var User = require('../models/user.model')
    const globals = require('../consts')

    module.listAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        if (!currentUser || currentUser.role > globals.ROLE_ADMIN) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }

        try {
            var tables = await TableService.getAll(currentUser)
            return res.status(200).json(tables);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    module.viewAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        if (!currentUser || currentUser._id === req.params.id || currentUser.role > globals.ROLE_ADMIN) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }

        try {
            var table = await TableService.get(req.params.id)

            if (!table) {
                res.status(404).send('Not found');
                return
            }

            return res.status(200).json(table);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    module.createAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        if (!currentUser || currentUser.role > globals.ROLE_ADMIN) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }

        try {
            var table = await TableService.create(req.body, currentUser)

            return res.status(200).json(table);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    module.editAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        if (!currentUser || currentUser._id === req.params.id || currentUser.role > globals.ROLE_ADMIN) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }

        try {
            var table = await TableService.edit(req.params.id, req.body)

            return res.status(200).json(table);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    module.deleteAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        if (!currentUser || currentUser.role > globals.ROLE_ADMIN) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }

        try {
            var table = await TableService.delete(req.params.id)

            return res.status(200).json(table);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    module.addFoodAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        if (!currentUser || currentUser.role > globals.ROLE_ADMIN) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }
        try {
            var table = await TableService.addFood(req.params.id, req.body)

            return res.status(200).json(table);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    module.editFoodAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        if (!currentUser || currentUser._id === req.params.id || currentUser.role > globals.ROLE_USER) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }

        try {
            var table = await TableService.edit(req.params.id, req.params.foodId, req.body)

            return res.status(200).json(table);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    module.deleteFoodAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        if (!currentUser || currentUser.role > globals.ROLE_USER) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }

        try {
            var table = await TableService.deleteFood(req.params.id, req.params.foodId)

            return res.status(200).json(table);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    module.submitAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        if (!currentUser || currentUser._id === req.params.id || currentUser.role > globals.ROLE_USER) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }

        try {
            var table = await TableService.submit(req.params.id)

            return res.status(200).json(table);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    return module
}