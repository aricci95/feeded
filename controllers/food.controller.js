module.exports = function (io) {
    var module = {}
    var FoodService = require('../services/food.service')(io)
    var User = require('../models/user.model')
    const url = require('url');
    const globals = require('../consts')

    module.listAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        if (!currentUser || currentUser.role > globals.ROLE_ADMIN) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }

        try {
            var foods = await FoodService.getAll(currentUser)
            return res.status(200).json(foods);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    module.searchAction = async function (req, res, next) {
        const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

        let { label } = url.parse(req.url, true).query

        if (!currentUser || currentUser.role > globals.ROLE_USER) {
            res.status(403).send({ message: 'Forbidden' });
            return
        }

        try {
            var foods = await FoodService.search(label, currentUser)
            return res.status(200).json(foods);
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
            var food = await FoodService.get(req.params.id)

            if (!food) {
                res.status(404).send('Not found');
                return
            }

            return res.status(200).json(food);
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
            var food = await FoodService.create(req.body, currentUser)

            return res.status(200).json(food);
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
            var food = await FoodService.edit(req.params.id, req.body)

            return res.status(200).json(food);
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
            var food = await FoodService.delete(req.params.id)

            return res.status(200).json(food);
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }

    return module
}