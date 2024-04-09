// servermangodb.js
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

const password = encodeURIComponent("Tango@123");
const uri = `mongodb+srv://tejasvarun:${password}@cluster0.qoovtdm.mongodb.net/test?retryWrites=true&w=majority`;

const port = process.env.PORT || 3011;
let collection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri);

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Cat');
        console.log('MongoDB connected');
    } catch (ex) {
        console.error('Error connecting to MongoDB:', ex);
    }
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/cats', async (req, res) => {
    try {
        const result = await getAllCats();
        res.json({ statusCode: 200, data: result, message: 'Get all cats successful' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});

app.post('/api/cat', async (req, res) => {
    try {
        const cat = req.body;
        const result = await postCat(cat);
        res.status(201).json({ statusCode: 201, data: result.ops, message: 'Success' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});

async function postCat(cat) {
    return await collection.insertOne(cat);
}

async function getAllCats() {
    return await collection.find({}).toArray();
}

app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
    runDBConnection();
});
