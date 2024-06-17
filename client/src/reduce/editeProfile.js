import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"





export const editeAsync = createAsyncThunk(
    "edit/user",
    async ({ id, userData }) => {
      // console.log("userdata",userData)
      try {
        const response = await axios.put(`http://${AP_ADRESS}:3000/api/user/update/${id}`, userData);
        console.log("edited");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

