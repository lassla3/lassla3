const { create } = require("domain");
const prisma = require("../database");

module.exports={
    gethotels: async function(req, res) {
        try {
            const hotels = await prisma.hotel.findMany();
            res.json(hotels);
          } catch (error) {
            console.error('Error retrieving hotels:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }

    }
