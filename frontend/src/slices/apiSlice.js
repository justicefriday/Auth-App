import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    // if we are not using proxy baseuri will be:baseUrl:' http://localhost:5000/api'
    baseUrl: ''
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User',], //User here is the only tagtype that we have in our bcakend
    endpoints: (builder) => ({

    })

})

