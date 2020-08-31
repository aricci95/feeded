var mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, 'Label is required'],
    },
    price: Number,
    type : {
        type: String,
        default: 'Plat',
        required: [true, 'Type is required']
    },
    active: {
        type: Boolean,
        default: true,
    },
    restaurantId : {
        type: Number,
        required: [true, 'Restaurant Id is required'],
    },
})

module.exports = mongoose.model('Food', FoodSchema);