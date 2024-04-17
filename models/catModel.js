const connection = require('../db/connection');

async function postCat(cat) {
    const collection = connection.getCollection();
    return await collection.insertOne(cat);
}

async function getAllCats() {
    const collection = connection.getCollection();
    return await collection.find({}).toArray();
}

module.exports = {
    postCat,
    getAllCats
};
