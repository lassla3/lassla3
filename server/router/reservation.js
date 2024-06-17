const router = require('express').Router();
const {addReservation,getReservationByHotelId,getAllReservations,getReservationByUserId}=require('../controller/reservation')
router.post('/',addReservation)
router.get('/allRes',getAllReservations)
router.get("/:id",getReservationByHotelId)
router.get('/res/:userId',getReservationByUserId)
module.exports = router;