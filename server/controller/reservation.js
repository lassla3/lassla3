const {reservation,room,user,dayAvailability, hotel}=require('../database/index')

module.exports={
    addReservation: async function(req, res) {
        try {
          const { userId, roomId ,dates} = req.body
          
          const users = await user.findUnique({
            where: {
              id: userId
            }
          })
    
          if (!users) {
            return res.status(400).send({ error: 'User not found' })
          }
         
          const existingReservation = await reservation.findFirst({
            where: {
              AND: [
                { roomId: roomId },
              
              ]
            }
          })
          
          if (existingReservation) {
            return res.status(400).json({ error: 'Room is already reserved' })
          }else{
            const newReservation = await reservation.create({
            
              data: {
                
                startDate: new Date(dates[0]),
                endDate: new Date(dates[dates.length-1]),
               
                room: {
                  connect: {
                    id: roomId
                  }
                },
                user: {
                  connect: {
                    id: userId
                  }
                },           
              },
           
            })

          
               const x=  await dayAvailability.create({
                  data:{
                    nigth:dates,
                    roomId:roomId,
                    availability:false
                  }
                })

         
       
           
          
            res.status(200).send(newReservation)

          }
    
          
        } catch (error) {
          
        }
      },
    removeReservation:async function(req,res){
        try {
            const reservations=await reservation.delete({where:{id:Number(req.params.id)}})
            res.status(200).send(reservations)
        } catch (error) {
            console.log(error);
        }
    },
    getAllReservations:async function(req,res){
        try {
            const reservations=await reservation.findMany({
              include:{room:{include:{hotel:true}}}
            })
            res.status(200).send(reservations)
        } catch (error) {
            console.log(error);
        }
    },
    getReservationByHotelId:async function(req,res){
      try {
          const reservations=await hotel.findUnique({
            where:{id:parseInt(req.params.id)},
            include:{
              room:{
                include:{
                  reservation:true
                }
              }
            }
   
            
          })
          res.status(200).send(reservations)
      } catch (error) {
          throw error
      }
  },
    getReservationByUserId:async function(req,res){
        try {
          const userId = req.params.userId; // or req.body.userId, depending on how you are sending the data
          const reservations = await reservation.findMany({
            where: {
              userId: {
                equals: parseInt(userId)
              }
            },
            include: {
              room: {
                include: {
                  option: true,
                  hotel: true
                }
              }
            }
          })
            res.status(200).send(reservations)
        } catch (error) {
            console.log(error);
        }
    }
}