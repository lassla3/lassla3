import {createSlice} from '@reduxjs/toolkit';

import {getCityByLocation} from '../reduce/SearchHotel';



const searchHotelSlice = createSlice({
    name: 'searchHotel',
    initialState: {
        city: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCityByLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCityByLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.city = action.payload;
            })
            .addCase(getCityByLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default searchHotelSlice.reducer;
