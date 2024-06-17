import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"




export const fetchReviewAsync=createAsyncThunk(
    "get/review",
    async(id)=>{
        try {
            const response=await axios.get(`http://${AP_ADRESS}:3000/api/review/reviews/${id}`)
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)

