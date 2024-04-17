const { MongoClient } = require('mongodb');

const password = encodeURIComponent("Tango@123");
const uri = `mongodb+srv://tejasvarun:${password}@cluster0.qoovtdm.mongodb.net/test?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
let collection;

async function connectDB() {
    try {
        await client.connect();
        collection = client.db().collection('Cat');
        console.log('MongoDB connected');
    } catch (ex) {
        console.error('Error connecting to MongoDB:', ex);
    }
}

function getCollection() {
    return collection;
}

module.exports = {
    connectDB,
    getCollection
};
