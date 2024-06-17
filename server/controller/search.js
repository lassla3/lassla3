const {hotel}=require('../database/index');

module.exports={
  getHotelByName:async function(req,res) {
    try {
      const { location } = req.params;
      const hotels = await hotel.findMany({
        where: {
          location: req.params.location,
         
        }
      });
      res.status(200).send(hotels);
    } catch (error) {
     throw error
    }
},
    getHotelByNames:async function(req,res) {
        try {
            const {name}=req.params
            const hotels=await hotel.findMany(
                {
                    where: {
                      AND: [
                        {
                          hotelId: hotelId,
                        },
                        {
                          NOT: [
                            {
                              reservations: {
                                some: {
                                  startDate: {
                                    gte: endDate,
                                  },
                                  OR: [
                                    {
                                      startDate: {
                                        lte: startDate,
                                      },
                                      endDate: {
                                        gte: startDate,
                                      },
                                    },
                                    {
                                      endDate: {
                                        lte: endDate,
                                      },
                                    },
                                  ],
                                },
                              },
                            },
                          ],
                        },
                      ],
                    },
                  }
            )
            res.status(200).send(hotels)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addHotel:async function(req,res){
        try {
            const {imgUrl,ownerId,description,name,location,rooms,rating,licence}=req.body
            const newHotel=await hotel.create({
                data:{
                    name,
                    imgUrl,
                    location,
                    description,
                    rooms,
                    rating,
                    licence,
                    ownerId
                },
            
            })
            res.status(200).send(newHotel)
        } catch (error) {
           throw error
        }
    },
    searchHotelByLocation: async function(req, res) {
      try {
        const { location } = req.params;
        const hotels = await hotel.findMany({
          where: {
            location: location
          }
        });
        res.status(200).send(hotels);
      } catch (error) {
        res.status(500).send(error);
      }
    },
   
}
