const router = require('express').Router();
const {addReview,getReviews,getAllReviews,deletReviw} =require("../controller/review")
router.post("/addReview/:userId/:hotelId",addReview)
router.get("/reviews/:id",getReviews)
router.get("/allReviews",getAllReviews)
router.delete("/delRev/:id",deletReviw)






module.exports=router