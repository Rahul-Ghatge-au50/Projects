require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const login = require('./module/loginSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookieparser');
const cors  = require('cors');
const auth = require('./auth')


const port = process.env.PORT || 3001;
const Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to MongoDB');
    } catch (err) {
        throw (err);
    }
}

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());





app.post('/login',async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const user = await login.findOne({ email: email });

        if (!user) {
            const newUser = login({
                email: email,
                password: hashPass
            })

            const saved = await newUser.save();
            res.status(200).json('login');
        } else {

            let compare = await bcrypt.compare(password,user.password);
            compare ? (
                res.status(200).json('saved')
            ) : (
                res.status(401).json('Password is Incorrect')
            );
            const token = await jwt.sign({email},'reacttest');
            console.log(token);

            res.cookie('Cookie',token,{
                expires:new Date(Date.now()+120000),httpOnly:true}
                )
        }
    } catch (err) {
        res.status(401).send(err);
    }
})




app.listen(port, () => {
    console.log('Connected on Port ' + port);
    Connection()
})

