import {getOneAsync} from '../reduce/getOne'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    user:{},
    loading:false,
    error:""
}


const getOneSlice = createSlice({
    name:"get",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getOneAsync.pending,(state)=>{
            state.loading=true
        })
        .addCase(getOneAsync.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
        .addCase(getOneAsync.rejected,(state)=>{
            state.loading=false
            state.error="invalid email or password"
        })
    }
})

export default getOneSlice.reducer