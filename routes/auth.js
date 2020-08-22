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
        res.status(200).send({message: 'Authentication successful', token: user.password, code: 200});
        next()
        return
    } else {
        res.status(400).send({error:'Authentication failure', message:'invalid password', code: 400});
        return
    }
});

module.exports = router;