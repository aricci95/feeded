var Food = require('../models/food.model');

exports.getAll = async function () {
    let foods = await Food.find()
    return foods;
}

exports.get = async function (id) {
    let food = await Food.findOne({ _id: id })
    return food;
}

exports.create = async function (params) {
    const { label, type, price, active } = params

    label = label.charAt(0).toUpperCase() + label.slice(1)
    type = labtypeel.charAt(0).toUpperCase() + type.slice(1)

    let food = new Food({
        label,
        price,
        type,
        active,
    })

    await food.save()

    console.log('food created.')

    return food;
}

exports.edit = async function (id, params) {
    const { label, type, price, active } = params;

    const food = await Food.findOne({ _id: id })

    if (!food) {
        throw new Error('Food ' + id + ' not found')
    }

    if (label) {
        food.label = label.charAt(0).toUpperCase() + label.slice(1)
    }

    if (type) {
        food.type = type.charAt(0).toUpperCase() + type.slice(1)
    }

    if (price) {
        food.price = price
    }

    if (active) {
        food.active = active
    }

    await food.save()

    console.log('Food ' + id + ' edited')

    return food;
}

exports.delete = async function (id) {
    const result = await Food.deleteOne({ _id: id })

    console.log('Food ' + id + ' deleted')

    return result;
}