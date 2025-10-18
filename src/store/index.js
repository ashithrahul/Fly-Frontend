import { configureStore } from "@reduxjs/toolkit";
import suggestedReducer from "./reducers/suggest.reducer";
import searchResultsReducer from "./reducers/search.reducer";

const store = configureStore({
  reducer: {
    suggested: suggestedReducer,
    searchResults: searchResultsReducer,
  },
});

export default store;