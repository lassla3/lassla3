import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"





export const favoriteHotel = createAsyncThunk(
    "favorite/hotel",
    async ({ userId, hotelId }) => {
    
      try {
        const response = await axios.post(`http://${AP_ADRESS}:3000/api/favorite/${userId}/${hotelId}`);
        console.log("favorite back",response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );
  export const getFavoriteHotel = createAsyncThunk(
    "getfavorite/hotel",
    async ({ userId }) => {
    
      try {
        const response = await axios.get(`http://${AP_ADRESS}:3000/api/favorite/${userId}`);
        console.log("getfavorite back",response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );
  export const removeFavoriteHotel = createAsyncThunk(
    "removefavorite/hotel",
    async ({ hotelId }) => {
    
      try {
        const response = await axios.delete(`http://${AP_ADRESS}:3000/api/favorite/${hotelId}`);
        console.log("getfavorite back",response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

