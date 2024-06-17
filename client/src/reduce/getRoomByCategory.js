import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {AP_ADRESS} from "../apAdress"
// const body={
//   view:selectedValue,
//   capacity:count,
//   hotelId:hotelId
// }
export const fetchRoomByCategory = createAsyncThunk(
  'rooms/fetchByCategory',
  async ({
    view,
    hotelId
  }, thunkAPI) => {
    
    try {
      const response = await axios.get(`http://${AP_ADRESS}:3000/api/owner/${hotelId}/${view}` );
      console.log('back',response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);