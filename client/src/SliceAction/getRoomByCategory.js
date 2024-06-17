import { createSlice } from '@reduxjs/toolkit';
import { fetchRoomByCategory } from '../reduce/getRoomByCategory';


const initialState={
    room:null,
    loading:false,
    error:""
}
const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchRoomByCategory.pending,(state)=>{
        state.loading=true
    })
      .addCase(fetchRoomByCategory.fulfilled, (state, action) => {
        state.room = action.payload;
      })
      .addCase(fetchRoomByCategory.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export default roomsSlice.reducer;