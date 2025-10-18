import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constant';

export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        searchSuggestions: builder.query({
            query: (searchTerm) => `/suggestions?q=${searchTerm}`,
        }),

       searchResult: builder.query({
            query: (searchTerm) => `/search?q=${searchTerm}`,
        }),
    }),

})

export const { useLazySearchSuggestionsQuery, useSearchResultQuery } = searchApi;