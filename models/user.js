module.exports = function (mongoose) {
    return mongoose
        .model('User', new mongoose.Schema({
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
            firstName:  {
                type: String,
                required: [true, 'firstName is required'],
            },
            lastName: String,
            password: String,
            role: {
                type: String,
                default: 'WAITER',
            },
            active: {
                type: Boolean,
                default: true,
            },
        })
        )
};