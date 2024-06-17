import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../../apAdress"





export const signUpAsync=createAsyncThunk(
    "signUp/user",
    async(obj,{rejectWithValue})=>{
        try {
            const response=await axios.post(`http://${AP_ADRESS}:3000/api/user/register`,obj)
            console.log("signed");
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

