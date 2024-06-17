import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCityByLocation } from '../api'; // Replace with your API function
import axios from 'axios';
// Define the async thunk
export const getCityByLocation = createAsyncThunk(
    'searchHotel/getCityByLocation',
    async (location) => {
        try {
            const response = await axios.get(`http://192.168.104.2:3000/api/search/${location}`);
            console.log('hellloooooo',response.data);
            return response.data; 

        } catch (error) {
          
            throw error;
        }
    }
);