import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"
import { user } from '../../../server/database'

export const reservation = createAsyncThunk(
    'reservation',
    async (body) => {
      try {
        const {data} = await axios.post(`http://${AP_ADRESS}:3000/api/reservation`,body)
        console.log('yesssssssssssssssss',data);
        return data
      } catch (error) {
          return error.response.data.message
         }}
  )
  export const getReservation = createAsyncThunk(
    'get/reservation',
    async (userId) => {
      try {
        const {data} = await axios.get(`http://${AP_ADRESS}:3000/api/reservation/res/${userId}`)
        console.log('reservation',data);
        return data
      } catch (error) {
          return error.response.data.message
         }}
  )