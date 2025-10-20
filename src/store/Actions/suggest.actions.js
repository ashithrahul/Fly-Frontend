import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchListAPI } from './../../utils/api.utils';
import { API_URL } from '../../constant';

export const fetchSuggestionsList = createAsyncThunk(
  'suggestions/fetchList',
  async searchTerm => {
    return await fetchListAPI({
      url: `${API_URL}/suggestions?q=${searchTerm}`,
    });
  }
);
