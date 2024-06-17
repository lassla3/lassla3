import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AP_ADRESS } from '../apAdress';


export const createRoomsForHotel = createAsyncThunk(
    'hotel/createRoomsForHotel',
  async ( { hotelId, roomTemplate, numRooms }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://${AP_ADRESS}:3000/api/owner/Rooms`,
        { 
          hotelId, 
          roomTemplate, 
          numRooms 
        }
      );
      return response.data;
    } catch (error) {
      console.error('create Rooms For Hotel error:', error.response || error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
