const router = require('express').Router();
const {getHotelByNames,searchHotelByLocation}=require('../controller/search')

router.get('/:location' , searchHotelByLocation);

module.exports = router