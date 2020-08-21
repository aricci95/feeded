module.exports = function (mongoose) {
    return mongoose.model('Table', new mongoose.Schema({
        number: {
            type: Number,
            required: [true, 'Number is required'],
        },
        slots: {
            type: Number,
            required: [true, 'Slots is required'],
        },
    }))
};