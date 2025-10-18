import { configureStore } from '@reduxjs/toolkit';
import suggestionsReducer from './suggestionsSlice';
import { searchApi } from './searchApi';

export const store = configureStore({
  reducer: {
    suggestions: suggestionsReducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchApi.middleware),
});

export default store;