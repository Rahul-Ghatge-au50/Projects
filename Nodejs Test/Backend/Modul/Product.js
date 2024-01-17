const mongoose = require('mongoose');
const Category = require('./Category');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        Unique:true
    },
    categoryId:{
        type: String
    },
    price:{
        type:Number
    },
    desc:{
        type:String
    },
    slug:{
        type:Number,
        unique:true
    }
})

module.exports = new mongoose.model('products',productSchema);