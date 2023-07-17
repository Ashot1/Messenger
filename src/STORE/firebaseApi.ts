import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {getDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../firebaseInit.ts";
import {UserFromList} from "../ENTITY/UserList";

export type newsType = {
    createAt: string,
    title: string,
    content: string[]
}

export const firebaseapi = createApi({
    reducerPath: 'firebase',
    tagTypes: [],
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getContacts: build.query({
            queryFn: async ({data}: {data: string[] | undefined}) => {
                if(!data) return {data: []}
                let users: UserFromList[] = []
                const responses = data.map((user) => {
                    return getDoc(doc(db, "Users", user))
                        .then(response => {
                            users.push({
                                tag: `@${response.data()?.tag}`,
                                name: response.data()?.name,
                                photo: response.data()?.photo,
                                uid: response.id
                            })
                        })
                })
                await Promise.all(responses)
                return {data: users}
            }
        }),
        getAcceptData: build.query({
            queryFn: async ({dataTo, dataFrom}: {dataTo: string[] | undefined, dataFrom: string[] | undefined}) => {
                if(!dataTo || !dataFrom) return {data: {acceptTo: [], acceptFrom: []}}

                let acceptTo: UserFromList[] = [],
                    acceptFrom: UserFromList[] = []

                const responses1 = dataTo.map((user) => {
                    return getDoc(doc(db, "Users", user))
                        .then(response => {
                            acceptTo.push({
                                tag: `@${response.data()?.tag}`,
                                name: response.data()?.name,
                                photo: response.data()?.photo,
                                uid: response.id
                            })
                        })
                })
                const responses2 = await Promise.all(dataFrom.map((user) => {
                    return getDoc(doc(db, "Users", user))
                        .then(response => {
                            acceptFrom.push({
                                tag: `@${response.data()?.tag}`,
                                name: response.data()?.name,
                                photo: response.data()?.photo,
                                uid: response.id
                            })
                        })
                }))
                await Promise.all(responses1)
                await Promise.all(responses2)

                return {data: {acceptTo: acceptTo, acceptFrom: acceptFrom}}
            }
        }),
        createNotification: build.mutation({
            queryFn: async ({toId, getDate, text, fromPhoto, url}: {toId: string, getDate: (item: string) => string, text: string, fromPhoto: string | undefined, url: string}) => {
                try{
                    getDoc(doc(db, "Notifications", toId))
                        .then((response) => {
                            const date = new Date()
                            return updateDoc(doc(db, "Notifications", toId), {
                                notifications: [...response.data()?.notifications,
                                    {text: text, createAt: getDate(date.toString()), icon: fromPhoto || '', url: url}]
                            })
                        })
                    return {data: true}
                }
                catch(err: unknown) {
                    throw new Error((err as Error).message)
                }

            }
        })

    })
})

export const {
    useGetContactsQuery,
    useGetAcceptDataQuery,
useCreateNotificationMutation} = firebaseapi