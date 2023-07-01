import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { collection, query, getDocs } from "firebase/firestore";
import {db} from "../firebaseInit.ts";

export type newsType = {
    createAt: string,
    title: string,
    content: string[]
}

export const firebaseapi = createApi({
    reducerPath: 'firebase',
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getNews: build.query({
            async queryFn() {
                try {
                    const result =
                        await getDocs(query(collection(db, "News")))
                    let news: newsType[] = []
                    result.forEach(doc => {
                        news.push(doc.data() as newsType)
                    })
                    return {data: news}
                } catch(e) {
                    return {error: e}
            }
        }})
    })
})

export const {useGetNewsQuery} = firebaseapi