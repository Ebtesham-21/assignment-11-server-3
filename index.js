const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');

const app = express();
const port = process.env.PORT || 5003;

// midlleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ctrvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

async function run(){
    try{
        await client.connect();
        const database = client.db('travel_agency');
        const productCollection = database.collection('products');

        //get products api
        app.get('/products', async(req, res) => {
            const cursor = productCollection.find({});
            const products = await cursor.toArray();
            res.send(products);


        })


       

    }
    finally{
        // await client.close();
    }

}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server running ok');
});



app.listen(port, () => {
    console.log('server running port', port);
})