module.exports = function (io) {
    var module = {}
    var Table = require('../models/table.model');
    const globals = require('../consts');

    module.getAll = async function (currentUser, filter = null) {
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

    module.updateStatus = async function (tableId, foodIds, status) {
        table = await Table.findOne({ _id: tableId }).select("-restaurantId")

        if (!table) {
            throw new Error('Table ' + id + ' not found')
        }

        let requiresUpdate = false

        for (var key in table.foods) {
            if (foodIds.includes(table.foods[key].id)) {
                if (status === globals.PREPARATION_STATUS_DONE && table.foods[key].status != globals.PREPARATION_STATUS_PREPARATION) {
                    //throw new Error('Preparation : cannot update from status ' + table.foods[key].status + ' to ' + status)
                }

                table.foods[key].status = status

                requiresUpdate = true
            }
        }

        if (requiresUpdate) {
            await table.save()

            io.sockets.on('connection', function (socket) {
                socket.emit('message', { content: 'Food is ready !', importance: '1' });
            });

            console.log('Table ' + tableId + ' food status updated to ' + status)
        }

        return table;
    }

    return module
}