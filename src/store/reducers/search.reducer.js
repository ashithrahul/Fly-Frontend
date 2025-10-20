import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchList } from '../Actions/search.actions';

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetSearchState: () => {
      return searchResultsSlice.getInitialState();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSearchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  resetSearchState,
} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
