import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { DocumentData } from "@firebase/firestore-types";


// acceptTo - заявки к currentUser, acceptFrom - заявки от currentUser

export const firebaseAPI2 = createApi({
    reducerPath: 'firebaseAPI',
    tagTypes: ['News', 'Lists', 'AcceptFrom'],
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
        getLists: build.query({
            providesTags: ['Lists'],
            query: ({id}: { id: string | undefined }) => `/Users/${id}`,
            transformResponse: (response: DocumentData) => {
                const acceptToData = response?.fields.acceptList.arrayValue,
                    friendsData = response?.fields.friendList.arrayValue

                let friendsList: string[] = [],
                    acceptToList: string[] = []

                if (!!acceptToData?.values) {
                    acceptToData.values.forEach((item: { stringValue: string }) => acceptToList.push(item.stringValue))
                }

                if (!!friendsData?.values) {
                    friendsData.values.forEach((item: { stringValue: string }) => friendsList.push(item.stringValue))
                }

                return {acceptTo: acceptToList, friends: friendsList}
            },
        }),

        addToList: build.mutation({
            invalidatesTags: ['Lists'],
            query: ({id, massive, values}: {id: string | undefined, massive: string, values: {stringValue: string}[]}) => ({url: `/Users/${id}?updateMask.fieldPaths=${massive}`, method: 'PATCH',
                body: JSON.stringify({
                    fields: {
                        [massive]: {
                            arrayValue: {
                                values: values
                            }
                        }
                    }
                })}),
        })
    })
})



export const {useGetNewsQuery,
    useAddNewsMutation,
    useGetListsQuery,
    useAddToListMutation
} = firebaseAPI2