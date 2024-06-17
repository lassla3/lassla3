const { room,hotel, dayAvailability } = require('../database/index');

const axios = require('axios');
const xml2js = require('xml2js');
const geolib = require('geolib');
const { default: hotels } = require('../../client/src/component/const/Hotels');

module.exports={
 
      getRoomPrice : async function(req,res) {
       try {
         
  
          
        
            const { plan,price,hotelId,view,numRoom} = req.params;
       console.log(req.params);

       
          const map = await room.findMany({
         where:{
         hotelId:Number(hotelId)
         },

          include:{
              dayAvailability:{
                where:{

                  availability:true
                },
              },
              // hotel:true,
            option:{
              select:{
                Meal_Plan:true
              }
            
            }
            
  
            },
            
           
            take:1
          });

        
     
   
      
        
      
          
        

        const allRooms=await room.findMany({
      where:{
       OR:[
         {price:{ 
            lte:Number(price),
            
           }},
           {dayAvailability:{
            some:{
              availability:true
            }
           }},
           {view:{equals:view}}
       ],
           } ,
         include:{
             hotel: true,
           option:{
               select:{
                   Meal_Plan:true
                 },
                 where:{
               AND:[
                 {Meal_Plan:{equals:plan}}
                ]
             }
           },
           
         },
         take:2
        })

        res.send({mainRooms:map,relatedRooms:allRooms});


        

} catch (error) {
throw error
}
}
}
