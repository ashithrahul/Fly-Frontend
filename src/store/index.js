import { configureStore } from '@reduxjs/toolkit';
import suggestionsReducer from './reducers/suggest.reducer';
import searchResultsReducer from './reducers/search.reducer';

const store = configureStore({
  reducer: {
    suggestions: suggestionsReducer,
    searchResults: searchResultsReducer,
  },
});

export default store;
