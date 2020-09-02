var mongoose = require('mongoose')

var TableFoodSchema = require('../models/tableFood.model').model('TableFood').schema;

const TableSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, 'Number is required'],
    },
    slots: Number,
    restaurantId : {
        type: Number,
        required: [true, 'Restaurant Id is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    foods: [TableFoodSchema]
})

module.exports = mongoose.model('Table', TableSchema);