require('dotenv').config();
const express = require('express');
const app = express();
const Port = 5001 || process.env.PORT;
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const bcrypt = require('bcrypt');

app.use(cookieparser())


app.use(express.json());
app.use(cors());
const { MongoClient, ServerApiVersion, Db } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c8zsamg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        //connect client to server;
        await client.connect();
        console.log("You successfully connected to MongoDB!");

        const userCollection = client.db('nodejs_task').collection('users');  //this is user collection;

        //Users post route
        app.post('/login', async (req, res) => {
            const email = req.body.email;
            try{
                const user = await userCollection.findOne({ email: email });
                !user && res.send('Wrong Creditianls!');

                const validate = await bcrypt.compare(req.body.password, user.password);
                !validate && res.send('Wrong Creditianls!');

                const token = jwt.sign({id:user._id},'mysecretkey',{expiresIn: '5s'});
                res.cookie('access_token', token, { httpOnly: true });
                res.send(user);
                console.log(token);
            }catch(error){
                console.log(error);
            }
        })


        app.post('/register', async (req, res) => {
            let password = req.body.password;
            try {
                const salt = await bcrypt.genSalt(10);
                const hash_pass = await bcrypt.hash(password, salt);

                const newUser = await userCollection.insertOne({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash_pass,
                });
                res.send(newUser);
            } catch (error) {
                console.log(error)
            }
        })

    } catch (error) {
        console.log(error);
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);


app.listen(Port, () => {
    console.log(`Listing at port no ${Port}`);
    //connect();
})