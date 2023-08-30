const mongoose = require('mongoose');


const loginSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const login = new mongoose.model('login',loginSchema);
module.exports = login;