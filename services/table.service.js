var Table = require('../models/table.model');

exports.getAll = async function (currentUser) {
    let tables = await Table.find({ restaurantId: currentUser.restaurantId }).select("-restaurantId")
    return tables;
}

exports.get = async function (id) {
    let table = await Table.findOne({ _id: id })
    return table;
}

exports.create = async function (params, currentUser) {
    const { number, slots } = params

    let restaurantId = currentUser.restaurantId

    let table = new Table({
        number,
        slots,
        restaurantId,
    })

    await table.save()

    console.log('table created.')

    return table;
}

exports.edit = async function (id, params) {
    const { number, slots } = params;

    const table = await Table.findOne({ _id: id }).select("-restaurantId")

    if (!table) {
        throw new Error('Table ' + id + ' not found')
    }

    if (number) {
        table.number = number
    }

    if (slots) {
        table.slots = slots
    }

    await table.save()

    console.log('Table ' + id + ' edited')

    return table;
}

exports.delete = async function (id) {
    const result = await Table.deleteOne({ _id: id })

    console.log('Table ' + id + ' deleted')

    return result;
}