import {createSlice } from '@reduxjs/toolkit';
import {createRoomsForHotel} from '../reduce/Rooms'

const initialState= {
    rooms: [],
    loading: false,
    error: null
}
const roomsSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {},
    extraReducers:(builder)=> {
        builder
        .addCase(createRoomsForHotel.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createRoomsForHotel.fulfilled, (state, action) => {
            state.loading = false;
            state.rooms = action.payload;
          })
          .addCase(createRoomsForHotel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
    }
});

export default roomsSlice.reducer;
