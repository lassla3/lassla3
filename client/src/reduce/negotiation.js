import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"





export const negotiation = createAsyncThunk(
    "negotiation/price",
    async ({roomId,newPrice,content,userId}) => { 
      try {
      const res=  await axios.post(`http://${AP_ADRESS}:3000/api/negotiation/${roomId}/${newPrice}/${content}/${userId}`);
        console.log("back nego",res.data);
      
      } catch (error) {
        console.log('somthing wrong',error);
      }
    }
  );
  export const getNegotiation = createAsyncThunk(
    "Negotiation/price",
    async (userId) => { 
      try {
      const res=  await axios.get(`http://${AP_ADRESS}:3000/api/negotiation/${userId}`);
        console.log("get nego from back",res.data);
      
      } catch (error) {
        console.log('somthing wrong',error);
      }
    }
  );
  export const getHotelWhereOwnerId = createAsyncThunk(
    "owner/price",
    async (ownerId) => { 
      try {
      const res=  await axios.get(`http://${AP_ADRESS}:3000/api/negotiation/${ownerId}`);
        console.log("get nego from back",res.data);
      
      } catch (error) {
        console.log('somthing wrong',error);
      }
    }
  );

