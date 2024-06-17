const router = require('express').Router();
const {getRoomPrice}=require('../controller/CompairePrice')
router.get('/:plan/:price/:hotelId/:view/:numRoom',getRoomPrice)
module.exports = router;