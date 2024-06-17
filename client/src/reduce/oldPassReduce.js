import {createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {AP_ADRESS} from "../apAdress"




export const checkOldAsync=createAsyncThunk("oldPass/user",
    async({id,oldPassword})=>{
        console.log("oldpass",oldPassword);
        console.log("id",id);
        try {
            const response=await axios.post(`http://${AP_ADRESS}:3000/api/user/oldPassword/${id}`,oldPassword)
            console.log("resPass",response);
            return response.data
        } catch (error) {
            console.log("err",error);
        }
    }
)

