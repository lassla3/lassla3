import {fetchReviewAsync} from '../reduce/fetchReview'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    reviews:[],
    loading:false,
    error:""
}


const getReviewSlice = createSlice({
    name:"fetchReview",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchReviewAsync.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchReviewAsync.fulfilled,(state,action)=>{
            state.loading=false
            state.reviews=action.payload
        })
        .addCase(fetchReviewAsync.rejected,(state)=>{
            state.loading=false
            state.error="something happened"
        })
    }
})

export default getReviewSlice.reducer