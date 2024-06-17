
const express = require('express');
const router = express.Router();
const { gethotels } = require('../controller/hotelsController');

router.get('/hotels', gethotels);

module.exports = router;
