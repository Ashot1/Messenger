import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


// acceptTo - заявки к currentUser, acceptFrom - заявки от currentUser

export const firebaseAPI2 = createApi({
    reducerPath: 'firebaseAPI',
    tagTypes: ['Lists'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://firestore.googleapis.com/v1/projects/messenger-c10e5/databases/(default)/documents'
    }),
    endpoints: (build) => ({
        addToList: build.mutation({
            invalidatesTags: ['Lists'],
            query: ({id, massive, values}: {id: string | undefined, massive: string, values: {stringValue: string}[]}) => ({url: `/Lists/${id}?updateMask.fieldPaths=${massive}`, method: 'PATCH',
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



export const {
    useAddToListMutation
} = firebaseAPI2