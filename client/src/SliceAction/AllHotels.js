
import { createSlice } from '@reduxjs/toolkit';
import { AllHotell } from '../reduce/AllHotels';



const initialState={
    hotel:[],
    loading:false,
    error:""
}

const reservationSlice = createSlice({
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
            state.hotel=action.payload
        })
        .addCase(AllHotell.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message 
        })
    }
});



export default reservationSlice.reducer;