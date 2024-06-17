
import { createSlice } from '@reduxjs/toolkit'
import { oneUser,getRoomByUserId,addMessage,getAllMessages,createRoom} from '../reduce/chat'

// 

const initialState  ={
    
    loading: false,
    userInfo: [],  
    error: "",
    room:[],
    message:[],
    getMessage:'',
    success: false,
    
    }

     const authSlice = createSlice({
        name: 'currentUser/user',
        initialState,
     
     reducers:  {},
     extraReducers: (builder) => {
        builder
        .addCase(oneUser.pending, (state,action) => {
          state.loading = true;
         
        })
        .addCase(oneUser.fulfilled, (state, action) => {
          state.loading = false;
          state.userInfo = action.payload;
          state.success=true
        })
        .addCase(oneUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'An error occurred.';
        })
      
      .addCase(getRoomByUserId.pending, (state,action) => {
        state.loading = true;
       
      })
      .addCase(getRoomByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload;
        state.success=true
      })
      .addCase(getRoomByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      })
      .addCase(addMessage.pending, (state,action) => {
        state.loading = true;
       
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.success=true
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      })
      .addCase(getAllMessages.pending, (state,action) => {
        state.loading = true;
       
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.getMessage = action.payload;
        state.success=true
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      })
      .addCase(createRoom.pending, (state,action) => {
        state.loading = true;
       
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload;
        state.success=true
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      })
    }
   })
    
    export default authSlice.reducer