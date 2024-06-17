const router = require('express').Router();
const {addNegotiation,getNegotiation,getUserWhereHotelId,getHotelByName}=require('../controller/negotiate')
router.post('/:roomId/:newPrice/:content/:userId',addNegotiation)
router.get('/:hotelId',getNegotiation)
router.get('/get/:hotelId',getUserWhereHotelId)
router.get('/get/:name',getHotelByName)
module.exports = router;