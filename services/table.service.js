var Table = require('../models/table.model');

const globals = require('../consts')

const typeOrder = {
    'Starter': 1,
    'Boisson': 1,
    'Plat': 2,
    'Dessert': 3,
}

exports.getAll = async function (currentUser) {
    let tables = await Table.find({ restaurantId: currentUser.restaurantId }).select("-restaurantId").sort({ number: 'asc' })
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

exports.addFood = async function (id, food) {
    const table = await Table.findOne({ _id: id }).select("-restaurantId")

    if (!table) {
        throw new Error('Table ' + id + ' not found')
    }

    if (!table.foods) {
        table.foods = []
        table.createdAt = Date.now
        table.updatedAt = table.createdAt
    }

    food.id = table.foods.length + 1

    food.orderValue = typeOrder[food.type]

    table.foods.push(food)

    await table.save()

    console.log('Table ' + id + ' updated')

    return table;
}

exports.editFood = async function (id, idFood, params) {
    const { status } = params;

    if (!status) {
        throw new Error('Status is mandatory')
    }

    const table = await Table.findOne({ _id: id }).select("-restaurantId")

    if (!table) {
        throw new Error('Table ' + id + ' not found')
    }

    for (var key in table.foods) {
        if (table.foods[key].id === idFood) {
            table.foods[key].status = status
        }
    }

    await table.save()

    console.log('food ' + idFood + ' status updated from table ' + id)

    return table;
}

exports.deleteFood = async function (id, idFood) {
    const table = await Table.findOne({ _id: id }).select("-restaurantId")

    if (!table) {
        throw new Error('Table ' + id + ' not found')
    }

    for (var key in table.foods) {
        if (table.foods[key].id === idFood) {
            table.foods.splice(key, 1)
        }
    }

    await table.save()

    console.log('food ' + idFood + ' deleted from table ' + id)

    return table;
}

exports.submit = async function (id) {
    const table = await Table.findOne({ _id: id }).select("-restaurantId")

    if (!table) {
        throw new Error('Table ' + id + ' not found')
    }

    if (!table.foods) {
        throw new Error('Table ' + id + ' has no food to submit')
    }

    let smallestValue = 10

    for (var key in table.foods) {
        if (table.foods[key].status === globals.PREPARATION_STATUS_TODO && table.foods[key].orderValue < smallestValue) {
            console.log('OK')
            smallestValue = table.foods[key].orderValue
        }
    }

    let now = Date.now

    for (var key in table.foods) {
        if (table.foods[key].status === globals.PREPARATION_STATUS_TODO && table.foods[key].orderValue === smallestValue) {
            table.foods[key].status = globals.PREPARATION_STATUS_PREPARATION
            table.updatedAt = now
            console.log('Food ' + table.foods[key].id + ' sent for table ' + id)
        }
    }

    await table.save()

    console.log('Successfully submitted food to preparation for table ' + id)

    return table;
}