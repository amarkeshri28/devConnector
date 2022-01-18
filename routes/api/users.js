const express = require("express");
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');


//@route   POST api/users
// @des    Register user
// @access Public
router.post('/', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'please include a valid email').isEmail(),
    body('password', 'please enter a password of 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // return jsonwebtoken
        res.send('user registered');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    }




    res.send('User route');
});

module.exports = router;
