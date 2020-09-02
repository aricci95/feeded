var Table = require('../models/table.model');
const globals = require('../consts');

exports.getAll = async function (currentUser, filter = null) {
    let acceptedTypes = []

    if (filter === 'food') {
        acceptedTypes = ['Starter', 'Plat', 'Dessert']
    } else if (filter === 'bar') {
        acceptedTypes = ['Boisson']
    }

    tables = await Table.find({ restaurantId: currentUser.restaurantId }).select("-restaurantId").sort({ createdAt: 'asc' })

    let filteredFoods

    for (var key in tables) {
        filteredFoods = []

        for (var subKey in tables[key].foods) {
            if (tables[key].foods[subKey].status === globals.PREPARATION_STATUS_PREPARATION && (acceptedTypes.length === 0 || acceptedTypes.includes(tables[key].foods[subKey].type))) {
                filteredFoods.push(tables[key].foods[subKey])
            }
        }

        tables[key].foods = filteredFoods
    }

    let filteredTables = []

    for (var key in tables) {
        if (tables[key].foods && tables[key].foods.length > 0) {
            filteredTables.push(tables[key])
        }
    }

    return filteredTables;
}