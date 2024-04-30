const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');

router.get('/cats', catController.getAllCats);
router.post('/cats', catController.postCat);

module.exports = router;
