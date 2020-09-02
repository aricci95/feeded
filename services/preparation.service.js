var Table = require('../models/table.model');
const globals = require('../consts');

exports.getAll = async function (currentUser, filter = null) {
    let deleteIds = []

    let removeTypes = []

    if (filter === 'food') {
        removeTypes = ['Boisson']
    } else if (filter === 'bar') {
        removeTypes = ['Starter', 'Plat', 'Dessert']
    }

    tables = await Table.find({ restaurantId: currentUser.restaurantId }).select("-restaurantId").sort({ createdAt: 'asc' })

    for (var key in tables) {
        for (var subKey in tables[key].foods) {
            if (tables[key].foods[subKey].status != globals.PREPARATION_STATUS_PREPARATION || removeTypes.includes(tables[key].foods[subKey].type)) {
                tables[key].foods.splice(subKey, 1)
            }
        }
    }

    for (var key in tables) {
        if (!tables[key].foods || tables[key].foods.length === 0) {
            deleteIds.push(tables[key].number)
        }
    }

    for (var index in deleteIds) {
        for (var key in tables) {
            if (deleteIds[index] === tables[key].number) {
                tables.splice(key, 1)
                break
            }
        }
    }
    return tables;
}