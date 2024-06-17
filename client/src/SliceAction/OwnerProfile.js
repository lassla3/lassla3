import { createSlice } from '@reduxjs/toolkit';
import { promoteToOwner } from '../reduce/Ownerprofile';
const initialState= {
    loading: false,
    error: null,
    promotedOwner: null,
  }
const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(promoteToOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(promoteToOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.promotedOwner = action.payload;
      })
      .addCase(promoteToOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ownerSlice.reducer;
