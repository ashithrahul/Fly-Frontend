import { createSlice } from '@reduxjs/toolkit';
import { fetchSuggestedList } from '../Actions/suggest.actions';

const suggestedSlice = createSlice({
  name: 'suggested',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSuggestedList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestedList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSuggestedList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default suggestedSlice.reducer;
