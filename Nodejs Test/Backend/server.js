require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const Product = require('./Modul/Product');
const Category = require('./Modul/Category');

app.use(express.json());

//MONGODB CONNECTION
const connection = () => {
    try {
        mongoose.connect('mongodb+srv://rahulghatge166:Rahul210519@cluster0.c8zsamg.mongodb.net/Node-test');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}


//PRODUCT ROUTES POST
app.post('/product/add', async (req, res) => {

    const productName = req.body.name;
    try {
        const pro = await Product.findOne({ name: productName })
        //console.log(pro);
        if (pro) {
            res.json('The Product is already added');
        } else {
            const proData = new Product({
                name: req.body.name,
                categoryId: req.body.categoryId,
                price: req.body.price,
                desc: req.body.desc,
                slug: req.body.slug
            })

            const data = await proData.save();
            res.status(200).json({
                status: 'Success',
                data: data
            })
        }
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        console.log('Hii')
        const data = await Product.find({ _id: id });
        console.log("hii", data);
        res.status(200).json({
            status: 'Success',
            data: data
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.put('/product/update/:productId', async (req, res) => {
    const id = req.params.productId;
    const update = req.body
    const proName = req.body.name;
    try {

        const pro = await Product.findOne({ name: proName })
        if (pro) {
            res.json('The product is already added')
        } else {
            const data = await Product.findByIdAndUpdate({ _id: id }, { $set: update }, { new: true });
            console.log(data);
            res.status(200).json({
                status: 'Success',
                data: data
            })
        }
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})

app.delete('/product/delete/:productId', async (req, res) => {
    const id = req.params.productId;
    try {
        await Product.findByIdAndDelete({ _id: id });
        res.status(200).json({
            status: 'Success',
            data: 'Product is Deleted'
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.get('/api/product', async (req, res) => {
    //console.log('Product')
    try {
        const data = await Product.find();
        res.status(200).json({
            status: 'Success',
            data: data
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.post('/api/addproducts', async (req, res) => {
    const data = req.body;
    try {
        const products = await Product.insertMany(data);
        //console.log(products);
        res.status(200).json({
            status: 'Success',
            data: products
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.post('/category/add', async (req, res) => {
    //console.log(req.body);
    try {
        const data = new Category({
            name: req.body.name,
            desc: req.body.desc
        })
        const catData = await data.save();
        res.status(200).json({
            status: 'Success',
            data: catData
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.get('/category/all', async (req, res) => {
    try {
        const data = await Category.find();
        res.status(200).json({
            status: 'Success',
            data: data
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


app.listen(port, () => {
    console.log(`Listining on port no ${port}`);
    connection();
})