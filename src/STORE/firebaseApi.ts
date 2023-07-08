import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {collection, query, getDocs, getDoc, doc, where, updateDoc} from "firebase/firestore";
import {db} from "../firebaseInit.ts";
import CustomNotification from "../UI/CustomNotification";
import {UserFromList} from "../ENTITY/UserList";

export type newsType = {
    createAt: string,
    title: string,
    content: string[]
}

export const firebaseapi = createApi({
    reducerPath: 'firebase',
    tagTypes: ["AcceptFrom"],
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getAcceptFrom: build.query({
            providesTags: ['AcceptFrom'],
            queryFn: async (id: string | undefined)=>  {
                if(!id) return {}
                try{
                    const result = await getDocs(query(collection(db, "Lists"), where("acceptList", "array-contains", id)))
                    let list: string[] = []
                    result.forEach(item => list.push(item.id))
                    return {data: list}
                } catch (e) {
                    return{ error: e}
                }
            }
        }),
        deleteAcceptFrom: build.mutation({
            invalidatesTags: ['AcceptFrom'],
            queryFn: async ({id, text, userID}: {id: string | undefined, text: string, userID: string | undefined}) => {
                if(!id || !userID) return {error: 'Ошибка'}
                try {
                    await getDoc(doc(db, "Lists", id))
                        .then(response => {
                            updateDoc(doc(db, "Lists", id), {
                                acceptList: response.data()?.acceptList.filter((item: string) => item !== userID)
                            })
                        })
                    CustomNotification(text)
                    return {data: text}
                } catch (err) {
                    return {error: err}
                }

            }
        }),
        addAcceptFrom: build.mutation({
            invalidatesTags: ['AcceptFrom'],
            queryFn: async ({id, text, userID}: {id: string, text: string, userID: string | undefined}) => {
                if(!id || !userID) return {error: 'Ошибка'}
                try{
                    await getDoc(doc(db, "Lists", id))
                        .then(async (response) => {
                            await updateDoc(doc(db, "Lists", id), {
                                acceptList: response.data()?.acceptList.concat(userID)
                            })
                        })
                    CustomNotification(text)
                    return {data: text}
                } catch (err) {
                    return {error: err}
                }
            }
        }),
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
        })

    })
})

export const {
    useGetAcceptFromQuery,
    useDeleteAcceptFromMutation,
    useAddAcceptFromMutation,
    useGetContactsQuery,
    useGetAcceptDataQuery} = firebaseapi