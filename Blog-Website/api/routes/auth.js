const express = require('express');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const router = express.Router();

//REGISTER
router.post('/register', async (req, res) => {
    const password = req.body.password;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashPass
        });

        const user = await newUser.save();

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err);
    }
})


//LOGIN
router.post('/login', async (req, res) => {
    const username = req.body.username;

    try {
        const user = await Users.findOne({ username:username});
        !user && res.status(400).json('Wrong Creditianls!');

        const validate = await bcrypt.compare(req.body.password, user.password);
        !validate && res.status(400).json('Wrong Creditianls!');

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
