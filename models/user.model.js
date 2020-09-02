var mongoose = require('mongoose')
const globals = require('../consts')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email is required'],
    },
    firstName: {
        type: String,
        required: [true, 'firstName is required'],
    },
    lastName: String,
    password: String,
    role: {
        type: Number,
        default: globals.ROLE_USER,
    },
    active: {
        type: Boolean,
        default: true,
    },
    restaurantId : {
        type: Number,
        required: [true, 'Restaurant Id is required'],
    },
});

module.exports = mongoose.model('User', UserSchema);