var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = require('../models/user')(mongoose)

// List
router.get('/', async function (req, res, next) {
    const users = await User.find()
    res.json(users)
});

// View
router.get('/:id', async function (req, res, next) {
    const id = req.params.id // on récupère la valeure dans l'url
    const user = await User.findOne({ _id: id }) // on récupère le user grâce à son _id

    if (!user) {
        res.status(404).send('Not found');
        return
    }

    res.json(user)
});

// Create
router.post('/', async function (req, res, next) {
    const { email, firstName, lastName, password, role, active } = req.body;

    // Encrypt password
    const bcrypt = require('bcryptjs')

    let hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt())

    try {
        const user = new User({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            role,
            active,
        })
        await user.save()
        console.log('user created.')
        res.json(user)
        return
    } catch (error) {
        console.log("Error creating User: ", error);
        res
            .status(400)
            .json(error)
        return
    }
});

// Edit
router.put('/:id', async function (req, res, next) {
    const id = req.params.id
    const user = await User.findOne({ _id: id }) // on récupere le user pour pouvoir le modifier

    if (!user) {
        res.status(404).send('Not found');
        return
    }

    // on récupère les valeurs potentiellement modifiées
    const firstName = req.body.firstName;
    const lastName = req.body.lastName

    if (firstName) {
        user.firstName = firstName
    }

    if (lastName) {
        user.lastName = lastName
    }

    await user.save() // on sauvegarde les modifications

    res.json(user)
});

// Delete
router.delete('/:id', async function (req, res, next) {
    const id = req.params.id
    const result = await User.deleteOne({ _id: id })

    res.json(result)
});

module.exports = router;
