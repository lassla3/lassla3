const router = require('express').Router();
const {addFavoriteHotel,deleteFavorite,getfavorite,removeFavorite}=require('../controller/favorite')

router.post('/:userId/:hotelId',addFavoriteHotel)

router.delete('/delete/:userId/:hotelId',deleteFavorite)

router.get('/:userId',getfavorite)

router.delete('/remove',removeFavorite)

module.exports = router;