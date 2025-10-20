import { createSlice } from '@reduxjs/toolkit';
import { fetchSuggestionsList } from '../Actions/suggest.actions';

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSuggestionsList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestionsList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSuggestionsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default suggestionsSlice.reducer;
