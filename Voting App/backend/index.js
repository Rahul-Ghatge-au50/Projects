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
        const votedUser = client.db('Voting_App').collection('votedUser');

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
            } catch (error) {
                console.log(error)
            }
        })

        app.post('/votedUser',async(req,res) => {
            const user = req.body;
            const save = await votedUser.insertOne(user);
            //res.send(save);
        })


        app.get('/votedUser',async (req,res) => {
            const email = req.query.email
            const user = await votedUser.findOne({email:email});
            res.send(user);
            //console.log(user);
        })

        app.get('/candidateVote',async (req,res) => {
            const Candidate1 = await votedUser.countDocuments({candiate:"Candidate1"});
            const Candidate2 = await votedUser.countDocuments({candiate:"Candidate2"});
            const Candidate3 = await votedUser.countDocuments({candiate:"Candidate3"});
            const Candidate4 = await votedUser.countDocuments({candiate:"Candidate4"});

            res.send([
                {candiate:"Candidate1",count:Candidate1},
                {candiate:"Candidate2",count:Candidate2},
                {candiate:"Candidate3",count:Candidate3},
                {candiate:"Candidate4",count:Candidate4}
            ])
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