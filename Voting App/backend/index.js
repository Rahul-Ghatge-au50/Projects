const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rahulghatge166:Rahul210519@cluster0.c8zsamg.mongodb.net/?retryWrites=true&w=majority";

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
        // Connect the client to the server
        await client.connect();
        console.log('You have successfully connected to MongoDB');

        const userCollection = client.db('Voting_App').collection('Users');


        //USERS ROUTES
        app.post('/register', async (req, res) => {
            const password = req.body.password;
            try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);

                const newUser = await userCollection.insertOne({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    PhoneNo: req.body.PhoneNo
                });
                res.send(newUser);
            } catch (error) {
                console.log(error);
            }
        })

        app.post('/login', async (req, res) => {
            const email = req.body.email;
            try {
                const user = await userCollection.findOne({ email: email });
                !user && res.send('Wrong Creditianls!');

                const validate = await bcrypt.compare(req.body.password, user.password);
                !validate && res.send('Wrong Creditianls!');

                res.send(user);
            }catch(error){
                console.log(error)
            }
    })



    } catch (error) {
        // Ensures that the client will close when you finish/error
        console.log(error);
        await client.close();
    }
}
run().catch(console.dir);


app.listen(PORT, () => {
    console.log('Listining on port' + PORT);

})