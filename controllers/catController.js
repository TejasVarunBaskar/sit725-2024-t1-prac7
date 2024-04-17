const catModel = require('../models/catModel');

async function getAllCats(req, res) {
    try {
        const result = await catModel.getAllCats();
        res.json({ statusCode: 200, data: result, message: 'Get all cats successful' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
}

async function postCat(req, res) {
    try {
        const cat = req.body;
        const result = await catModel.postCat(cat);
        res.status(201).json({ statusCode: 201, data: result.ops, message: 'Success' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
}

module.exports = {
    getAllCats,
    postCat
};
