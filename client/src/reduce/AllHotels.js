import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"

export const AllHotell = createAsyncThunk(
    'allHotels',
    async () => {
      try {
        const {data} = await axios.get(`http://${AP_ADRESS}:3000/api/owner/all`)
        console.log("from back",data.user);
        return data
      } catch (error) {
          return error.response.data.message
         }}
  )