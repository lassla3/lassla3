import {getNegotiation} from '../reduce/negotiation'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    get:[],
    loading:false,
    error:""
}


const getNegotiations = createSlice({
    name:"negotiation/price",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getNegotiation.pending,(state)=>{
            state.loading=true
        })
        .addCase(getNegotiation.fulfilled,(state,action)=>{
            state.loading=false
            state.get=action.payload
        })
        .addCase(getNegotiation.rejected,(state)=>{
            state.loading=false
            state.error="something happened"
        })
    }
})

export default getNegotiations.reducer