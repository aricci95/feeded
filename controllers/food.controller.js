var FoodService = require('../services/food.service')
var User = require('../models/user.model')
var Food = require('../models/food.model')

exports.listAction = async function (req, res, next) {
    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser.role < global.ROLE_ADMIN) {
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

exports.viewAction = async function (req, res, next) {
    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser._id === req.params.id || currentUser.role < global.ROLE_ADMIN) {
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

exports.createAction = async function (req, res, next) {
    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser.role < global.ROLE_ADMIN) {
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

exports.editAction = async function (req, res, next) {
    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser._id === req.params.id || currentUser.role < global.ROLE_ADMIN) {
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

exports.deleteAction = async function (req, res, next) {
    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser.role < global.ROLE_ADMIN) {
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