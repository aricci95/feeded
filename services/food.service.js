module.exports = function (io) {
    var module = {}
    var Food = require('../models/food.model');
    const globals = require('../consts');

    module.getAll = async function (currentUser) {
        let foods = await Food.find({ restaurantId: currentUser.restaurantId }).select("-restaurantId").sort({ type: 'desc' })
        return foods;
    }

    module.search = async function (label, currentUser) {
        let foods = await Food.find({ restaurantId: currentUser.restaurantId })
            .select("-restaurantId")
            .sort({ type: 'desc' })
            .find({ label: { $regex: '.*' + label + '.*', $options: 'i' } })
            .limit(5);
        return foods;
    }

    module.get = async function (id) {
        let food = await Food.findOne({ _id: id })
        return food;
    }

    module.create = async function (params, currentUser) {
        let { label, type, price, active } = params

        const restaurantId = currentUser.restaurantId

        label = label.charAt(0).toUpperCase() + label.slice(1)
        type = type.charAt(0).toUpperCase() + type.slice(1)

        let food = new Food({
            label,
            price,
            type,
            active,
            restaurantId
        })

        await food.save()

        console.log('food created.')

        return food;
    }

    module.edit = async function (id, params) {
        const { label, type, price, active } = params;

        const food = await Food.findOne({ _id: id }).select("-restaurantId")

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

    module.delete = async function (id) {
        const result = await Food.deleteOne({ _id: id })

        console.log('Food ' + id + ' deleted')

        return result;
    }

    return module
}