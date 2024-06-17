import { createSlice } from '@reduxjs/toolkit';
import { getReservation } from '../reduce/reservation';
const initialState={
    reservation:{},
    loading:false,
    error:""
}

const getReservationn = createSlice({
    name: 'get/reservation',
    initialState, // Initial state for reservations

    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(getReservation.pending,(state)=>{
            state.loading=true
        })
        .addCase(getReservation.fulfilled,(state,action)=>{
            state.loading=false
            state.reservation=action.payload
        })
        .addCase(getReservation.rejected,(state)=>{
            state.loading=false
            state.error="invalid email or password"
        })
    }
});



export default getReservationn.reducer;