import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AP_ADRESS } from "../apAdress";

export const reviewAsync = createAsyncThunk(
    "post/review",
    async ({ userId, hotelId, obj }) => { 
        try {
            const response = await axios.post(`http://${AP_ADRESS}:3000/api/review/addReview/${userId}/${hotelId}`, obj); // Correct URL construction
            console.log("Review posted successfully");
            console.log("Review object", response.data);
            return response.data;
        } catch (error) {
            console.error("Error posting review:", error);
            throw error
        }
    }
);
