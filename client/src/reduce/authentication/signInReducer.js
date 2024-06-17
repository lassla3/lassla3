import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AP_ADRESS } from '../../apAdress';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signInAsync = createAsyncThunk(
  'signIn/user',
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://${AP_ADRESS}:3000/api/user/login`, obj);
      console.log("res", response.data);

      const token = response.data.token;
      if (typeof token === 'string') {
        await AsyncStorage.setItem('token', token);
      } else {
        throw new Error("Invalid token format");
      }

      const stringify = JSON.stringify(response.data.user);
      await AsyncStorage.setItem('user', stringify);

      console.log('Token stored successfully');
      return response.data;
    } catch (error) {
      console.error("Error during sign in:", error);
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);