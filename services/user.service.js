var User = require('../models/user.model');

exports.getAll = async function () {
    let users = await User.find().select("-password")
    return users;
}

exports.get = async function (id) {
    let user = await User.findOne({ _id: id }).select("-password")
    return user;
}

exports.create = async function (params) {
    const { email, firstName, lastName, role, active} = params

    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
    role = role.charAt(0).toUpperCase() + role.slice(1)

    let user = new User({
        email,
        firstName,
        lastName,
        role,
        active,
    })

    await user.save()

    console.log('user created.')

    user.password = 'dummy'

    return user;
}

exports.edit = async function (id, params) {
    const { email, firstName, lastName, password, role, active } = params;

    const user = await User.findOne({ _id: id }).select("-password")

    if (!user) {
        throw new Error('User ' + id + ' not found')
    }

    if (email) {
        user.email = email
    }

    if (firstName) {
        user.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    }

    if (lastName) {
        user.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
    }

    if (password) {
        user.password = password
    }

    if (role) {
        user.role = role.charAt(0).toUpperCase() + role.slice(1)
    }

    if (active) {
        user.active = active
    }

    await user.save()

    console.log('User ' + id + ' edited')

    return user;
}

exports.delete = async function (id) {
    const result = await User.deleteOne({ _id: id })

    console.log('User ' + id + ' deleted')

    return result;
}