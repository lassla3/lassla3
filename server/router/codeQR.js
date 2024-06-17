const router = require('express').Router();
const {getQRCode}=require('../controller/codeQR')
router.get('/generate-qr',getQRCode)

module.exports = router;

