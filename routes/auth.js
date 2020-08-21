var express = require('express');
var router = express.Router();
var User = require('mongoose').model('User');

// Login
router.post('/login', async function (req, res, next) {

    const { email, password } = req.body;

    if (!email || !password) {
        next(new Error('Missing arguments'))
        return
    }

    const user = await User.findOne({email: email })

    if (!user) {
        res.status(404).send('Not found');
        return
    }

    const bcrypt = require('bcryptjs')

    const validation = await bcrypt.compare(password, user.password);

    if (validation) {
        res.status(200).send('Authentication successful');
        next()
        return
    } else {
        res.status(400).send('Authentication failure : invalid password');
        return
    }
});

module.exports = router;