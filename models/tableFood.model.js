var mongoose = require('mongoose')
const globals = require('../consts')

const TableFoodSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Id is required'],
    },
    label: {
        type: String,
        required: [true, 'Label is required'],
    },
    price: Number,
    type: {
        type: String,
        default: 'Plat',
        required: [true, 'Type is required']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Number,
        default: globals.PREPARATION_STATUS_TODO,
    },
    orderValue: {
        type: Number,
        default: 1,
    },
})

module.exports = mongoose.model('TableFood', TableFoodSchema);