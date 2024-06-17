import { createSlice } from '@reduxjs/toolkit';
import { reservation } from '../reduce/reservation';
const initialState={
    reservation:{},
    loading:false,
    error:""
}

const reservationSlice = createSlice({
    name: 'reservation',
    initialState, // Initial state for reservations

    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(reservation.pending,(state)=>{
            state.loading=true
        })
        .addCase(reservation.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
        .addCase(reservation.rejected,(state)=>{
            state.loading=false
            state.error="invalid email or password"
        })
    }
});



export default reservationSlice.reducer;