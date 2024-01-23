require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const db = require('./db');
const cors = require('cors');

app.use(express.json());
app.use(cors());


//GET ALL RESTURANTS
app.get('/api/resturants', async (req, res) => {

    try {
        const { rows } = await 
        db.query('SELECT * FROM resturants LEFT JOIN (SELECT resturant_id,COUNT(reveiw),TRUNC(AVG(rating),1) AS average_rating FROM reveiws GROUP BY resturant_id) reveiws ON resturants.id = reveiws.resturant_id;');


        res.status(200).json({
            status: 'Success',
            results: rows.length,
            data: rows
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failure',
            data: err
        })
    }
})


//GET SINGLE RESTURANT
app.get('/api/resturants/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const { rows } = await 
        db.query('SELECT * FROM resturants LEFT JOIN (SELECT resturant_id,COUNT(reveiw),TRUNC(AVG(rating),1) AS average_rating FROM reveiws GROUP BY resturant_id) reveiws ON resturants.id = reveiws.resturant_id WHERE id = $1', [id]);

        const reveiws = await db.query('SELECT * FROM reveiws WHERE resturant_id = $1', [id]);

        res.status(200).json({
            status: 'Success',
            results: rows.length,
            data: rows,
            reveiws: reveiws.rows
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err,
        })
    }
})


//CREATE RESTURANT
app.post('/api/resturants', async (req, res) => {
    const data = req.body;

    const text = 'INSERT INTO resturants (name,location,price_range) VALUES ($1,$2,$3) RETURNING *';
    const values = [data.name, data.location, data.price_range];

    try {
        const { rows } = await db.query(text, values);
        res.status(200).json({
            status: 'Success',
            data: rows
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


//UPDATE RESTURANT
app.put('/api/resturants/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const text = 'UPDATE resturants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *';
    const values = [data.name, data.location, data.price_range, id];
    try {
        const { rows } = await db.query(text, values);
        res.status(200).json({
            status: 'Success',
            data: rows
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
})


//DELETE RESTURANT
app.delete('/api/resturants/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await db.query(`DELETE FROM reveiws WHERE resturant_id = ${id};DELETE FROM resturants WHERE id = ${id} `);
        res.status(200).json({
            status: 'Success',
            data: 'Deleted Successfully'
        })
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            data: err
        })
    }
});


//ADD REVEIW ROUTE;
app.post('/add/reveiw/:id',async(req,res) => {
    const resturant_id = req.params.id;
    const data = req.body;
    const text = 'INSERT INTO reveiws (resturant_id,name,reveiw,rating) VALUES ($1,$2,$3,$4) RETURNING *'
    const values = [resturant_id,data.name,data.reveiw,data.rating]
    try{
        const {rows} = await db.query(text,values);
        res.status(200).json({
            status:'Success',
            data:rows
        })
    }catch(err){
        res.status(401).json({
            status:'Failed',
            data:err
        })
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port number ${PORT}`)
})