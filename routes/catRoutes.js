const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');

router.get('/cats', catController.getAllCats);
router.post('/cat', catController.postCat);

module.exports = router;
