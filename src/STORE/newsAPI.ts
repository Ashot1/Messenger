import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const newsAPI = createApi({
    reducerPath: 'news',
    tagTypes: ['News'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://firestore.googleapis.com/v1/projects/messenger-c10e5/databases/(default)/documents'
    }),
    endpoints: (build) => ({
        getNews: build.query({
            providesTags: ['News'],
            query: () => '/News',
        }),

        addNews: build.mutation({
            invalidatesTags: ['News'],
            query: ({title, createAt, content}: {
                title: string,
                createAt: string,
                content: { stringValue: string }[]
            }) => ({
                url: '/News',
                method: 'POST',
                body: JSON.stringify({
                    fields: {
                        title: {stringValue: title},
                        createAt: {stringValue: createAt},
                        content: {arrayValue: {values: content}}
                    }
                })
            }),

        }),
    })
})

export const {useGetNewsQuery, useAddNewsMutation} = newsAPI