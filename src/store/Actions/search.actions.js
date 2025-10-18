import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListAPI } from "./../../utils/api.utils"
import { API_URL } from "../../constant";

export const fetchSearchList = createAsyncThunk(
  "searchResults/fetchList",
  async ({ searchTerm, currentPage }) => {
    return await fetchListAPI({ url: `${API_URL}/search?q=${searchTerm}&page=${currentPage}` });
  }
);