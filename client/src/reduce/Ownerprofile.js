import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AP_ADRESS } from '../apAdress';


export const promoteToOwner = createAsyncThunk(
  'owner/promoteToOwner',
  async (hotelData, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
    // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJpYXQiOjE3MTU2MDc4MTN9.hXGqJFauoj9T52yFTyUlnj7SYxHJJh-V5K_JBOAGe9E"
      const response = await axios.post(
        `http://${AP_ADRESS}:3000/api/owner/create`,
        { hotelData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Promote to owner error:', error.response || error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
