var mongoose = require('mongoose')

const TableSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, 'Number is required'],
    },
    slots: {
        type: Number,
        required: [true, 'Slots is required'],
    },
})

module.exports = mongoose.model('Table', TableSchema);