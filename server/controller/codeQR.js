const QRCode = require('qrcode');
module.exports={
    getQRCode : async function(req,res) {
        try {
            const { text } = req.query;
            if (!text) {
              return res.status(400).send('Text query parameter is required');
            }
            QRCode.toDataURL(text, (err, url) => {
              if (err) {
                return res.status(500).send('Error generating QR code');
              }
              res.send({url:url});
            });
          } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
          }
        }
}
 