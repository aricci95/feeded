var TableService = require('../services/table.service')
var User = require('../models/user.model')
var Table = require('../models/table.model')

exports.listAction = async function (req, res, next) {
    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser.role != 'ADMIN') {
        res.status(403).send({ message: 'Forbidden' });
        return
    }

    try {
        var tables = await TableService.getAll()
        return res.status(200).json(tables);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.viewAction = async function (req, res, next) {
    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser._id === req.params.id || currentUser.role != 'ADMIN') {
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

exports.createAction = async function (req, res, next) {
    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser.role != 'ADMIN') {
        res.status(403).send({ message: 'Forbidden' });
        return
    }

    try {
        var table = await TableService.create(req.body)

        return res.status(200).json(table);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.editAction = async function (req, res, next) {
    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser._id === req.params.id || currentUser.role != 'ADMIN') {
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

exports.deleteAction = async function (req, res, next) {
    const currentUser = await User.findOne({ email: req.headers.email, password: req.headers.token })

    if (!currentUser || currentUser.role != 'ADMIN') {
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