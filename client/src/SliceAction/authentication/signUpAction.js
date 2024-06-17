import {signUpAsync} from '../../reduce/authentication/signUpReducer'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    user:{},
    loading:false,
    error:""
}


const signUpSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(signUpAsync.pending,(state)=>{
            state.loading=true
        })
        .addCase(signUpAsync.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
        .addCase(signUpAsync.rejected,(state)=>{
            state.loading=false
            state.error="invalid information"
        })
    }
})

export default signUpSlice.reducer