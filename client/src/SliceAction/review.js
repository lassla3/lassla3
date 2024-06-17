import {reviewAsync} from '../reduce/review'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    reviw:null,
    loading:false,
    error:""
}


const reviewSlice = createSlice({
    name:"review",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(reviewAsync.pending,(state)=>{
            state.loading=true
        })
        .addCase(reviewAsync.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
        .addCase(reviewAsync.rejected,(state)=>{
            state.loading=false
            state.error="something happened"
        })
    }
})

export default reviewSlice.reducer