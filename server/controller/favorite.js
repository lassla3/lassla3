const {favoriteHotel}=require('../database/index')
module.exports={
    addFavoriteHotel: async function(req, res) {
        try {
            const {userId,hotelId}=req.params;
            const existingRecord = await favoriteHotel.findFirst({
                where: {
                    userId:parseInt(userId),
                    hotelId:parseInt(hotelId)
                }
              });
          
              if (existingRecord) {
               
                res.status(400).json({ message: 'This hotel is already in your favorites.' });
              } else {
            const user=await favoriteHotel.create({
                data:{
                    userId:parseInt(userId),
                    hotelId:parseInt(hotelId)
                }
            })
            res.status(200).json({user})
        }
        } catch (error) {
            throw error
        }
    },
    deleteFavorite:async function(req,res){
        try {
            const {userId,hotelId}=req.body;
            const user=await favoriteHotel.delete({
                where:{
                    userId,
                    hotelId
                }
            })
            res.status(200).json({user})
        } catch (error) {
            throw error
        }
    },
    getfavorite:async function(req,res){
        try {
            const {userId}=req.body;
            const user=await favoriteHotel.findMany({
                where:{
                    userId
                },
                include:{
                    hotel:true
                }
            })
            res.status(200).json({user})
        } catch (error) {
            throw error
        }
    },
    removeFavorite:async function(req,res){
        try {
            const {userId,hotelId}=req.body;
            const user=await favoriteHotel.deleteMany({
                where: {
                    userId: userId,
                    hotelId: hotelId,
                  }
            })
            res.status(200).json({user})
        } catch (error) {
            throw error
        }
    }
}