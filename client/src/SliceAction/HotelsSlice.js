
import { createSlice } from '@reduxjs/toolkit';
import {AllHotell} from "../reduce/Hotels"


const initialState={
    hotels:[],
    loading:false,
    error:""
}

const HotelSlice = createSlice({
    name: 'allHotels',
    initialState,

    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(AllHotell.pending,(state)=>{
            state.loading=true
        })
        .addCase(AllHotell.fulfilled,(state,action)=>{
            state.loading=false
            state.hotels=action.payload
            console.log("state.hotels",state.hotels);
        
        })
        .addCase(AllHotell.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message 
        })
    }
});

  
  export default HotelSlice.reducer;