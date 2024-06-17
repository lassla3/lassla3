import {negotiation,getNegotiation} from '../reduce/negotiation'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    nego:null,
    get:[],
    loading:false,
    error:""
}


const negotiations = createSlice({
    name:"negotiation/price",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(negotiation.pending,(state)=>{
            state.loading=true
        })
        .addCase(negotiation.fulfilled,(state,action)=>{
            state.loading=false
            state.nego=action.payload
        })
        .addCase(negotiation.rejected,(state)=>{
            state.loading=false
            state.error="something happened"
        })
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

export default negotiations.reducer