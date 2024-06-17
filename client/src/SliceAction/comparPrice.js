import {ComparPrice} from '../reduce/comparPrice'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    compar:[],
    loading:false,
    error:""
}


const comparPrice = createSlice({
    name:"get",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(ComparPrice.pending,(state)=>{
            state.loading=true
        })
        .addCase(ComparPrice.fulfilled,(state,action)=>{
            state.loading=false
            state.compar=action.payload
        })
        .addCase(ComparPrice.rejected,(state)=>{
            state.loading=false
            state.error="invalid email or password"
        })
    }
})

export default comparPrice.reducer