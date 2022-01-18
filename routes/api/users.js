const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator')

//@route   POST api/users
// @des    Register user
// @access Public
router.post('/', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'please include is valid email').isEmail(),
    body('password', 'please enter a password of 6 or more characters').isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    res.send('User route');
});

module.exports = router;
