var mongoose = require('mongoose')

var FoodSchema = require('../models/food.model').model('Food').schema;

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
    foods: [FoodSchema]
})

module.exports = mongoose.model('Table', TableSchema);