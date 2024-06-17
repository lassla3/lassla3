import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"




export const getOneAsync=createAsyncThunk(
    "get/user",
    async(id)=>{
        try {
            const response=await axios.get(`http://${AP_ADRESS}:3000/api/user/getOne/${id}`)
            console.log("geted")
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)

