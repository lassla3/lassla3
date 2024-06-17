import {editeAsync} from '../reduce/editeProfile'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    user:{},
    loading:false,
    error:""
}


const editeSlice = createSlice({
    name:"edit",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(editeAsync.pending,(state)=>{
            state.loading=true
        })
        .addCase(editeAsync.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
        .addCase(editeAsync.rejected,(state)=>{
            state.loading=false
            state.error="something happened"
        })
    }
})

export default editeSlice.reducer