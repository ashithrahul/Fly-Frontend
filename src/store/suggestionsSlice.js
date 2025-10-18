import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  suggestions: [],
  loading: false,
  error: null,
};

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
   
   
  },
});


// Export reducer
export default suggestionsSlice.reducer;