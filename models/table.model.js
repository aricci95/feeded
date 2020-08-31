var mongoose = require('mongoose')

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
})

module.exports = mongoose.model('Table', TableSchema);