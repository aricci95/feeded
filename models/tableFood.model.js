var mongoose = require('mongoose')

const TableFoodSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('TableFood', TableFoodSchema);