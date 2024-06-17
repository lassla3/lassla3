import {getHotelWhereOwnerId} from '../reduce/negotiation'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    get:[],
    loading:false,
    error:""
}


const getOwner = createSlice({
    name:"owner/price",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getHotelWhereOwnerId.pending,(state)=>{
            state.loading=true
        })
        .addCase(getHotelWhereOwnerId.fulfilled,(state,action)=>{
            state.loading=false
            state.get=action.payload
        })
        .addCase(getHotelWhereOwnerId.rejected,(state)=>{
            state.loading=false
            state.error="something happened"
        })
    }
})

export default getOwner.reducer