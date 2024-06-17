const router = require('express').Router();
const user=require('../controller/user.js');
const securite=require('../midellware/midelware.js')
const verifyUser=require('../midellware/VerifyUser.js')
const {getAllClinet} =require("../controller/user")





router.post('/register',securite,user.register)
router.get("/getOne/:id",user.getOne)
router.put("/ban/:id",user.banUser)
router.post('/login',user.login)
router.get("/user",user.getOne)
router.put("/update/:id",user.update)
router.get("/allUser",user.getAll)
router.get("/client",user.getAllClinet)
router.get("/owner",user.getAllOwner)





module.exports = router;