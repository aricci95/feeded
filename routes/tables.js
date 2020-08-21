var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Table = require('../models/table')(mongoose)


// TEST
router.get('/test', function (req, res, next) {
    res.status(200).send('OK');
});


// List
router.get('/', async function (req, res, next) {
    const tables = await Table.find()
    res.json(tables)
});

// View
router.get('/:id', async function (req, res, next) {
    const id = req.params.id // on récupère la valeure dans l'url
    const table = await Table.findOne({ _id: id }) // on récupère le table grâce à son _id

    if (!table) {
        res.status(404).send('Not found');
        return
    }

    res.json(table)
});

// Create
router.post('/', async function (req, res, next) {
    const { number, slots } = req.body;

    try {
        const table = new Table({
            number: number,
            slots: slots,
        })
        await table.save()
        console.log('Table created.')
        res.json(table)
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
    const table = await Table.findOne({ _id: id }) // on récupere le table pour pouvoir le modifier

    if (!table) {
        res.status(404).send('Not found');
        return
    }

    // on récupère les valeurs potentiellement modifiées
    const number = req.body.number;
    const slots = req.body.slots

    if (number) {
        table.number = number
    }

    if (slots) {
        table.slots = slots
    }

    await table.save() // on sauvegarde les modifications

    res.json(table)
});

// Delete
router.delete('/:id', async function (req, res, next) {
    const id = req.params.id
    const result = await Table.deleteOne({ _id: id })

    res.json(result)
});

module.exports = router;
