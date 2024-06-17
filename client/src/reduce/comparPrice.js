  import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"





export const ComparPrice = createAsyncThunk(
    "compair/price",
    async ({plan,price,hotelId,view,numRoom}) => {
      // console.log("userdata",userData)
      try {
        const response = await axios.get(`http://${AP_ADRESS}:3000/api/price/${plan}/${price}/${hotelId}/${view}/${numRoom}`);
        console.log("price",response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

