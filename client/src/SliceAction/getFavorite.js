
import {getFavoriteHotel} from '../reduce/favoriteHotel'
import { createSlice } from '@reduxjs/toolkit'



const initialState={
    getFavorite:[],
    loading:false,
    error:""
}


const getFavoriteSlice = createSlice({
    name:"getfavorite/hotel",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getFavoriteHotel.pending,(state)=>{
            state.loading=true
        })
        .addCase(getFavoriteHotel.fulfilled,(state,action)=>{
            state.loading=false
            state.getFavorite=action.payload
        })
        .addCase(getFavoriteHotel.rejected,(state)=>{
            state.loading=false
            state.error="something happened"
        })
      
    }
})

export default getFavoriteSlice.reducer