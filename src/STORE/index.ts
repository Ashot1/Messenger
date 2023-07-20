import {configureStore} from "@reduxjs/toolkit";
import menuReducer from './menuSlice.ts'
import userReducer from './userSlice.ts'
import {UserInitialType} from './userSlice.ts'
import {firebaseAPI2} from "./firebaseAPI2.ts";
import {firebaseapi} from "./firebaseApi.ts";
import {newsAPI} from "./newsAPI.ts";
import {MutationTrigger} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition
} from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer,
        [firebaseAPI2.reducerPath]: firebaseAPI2.reducer,
        [firebaseapi.reducerPath]: firebaseapi.reducer,
        [newsAPI.reducerPath]: newsAPI.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(firebaseAPI2.middleware, firebaseapi.middleware, newsAPI.middleware)
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type {UserInitialType}

export type listsMutationType = MutationTrigger<MutationDefinition<{
    id: string | undefined,
    massive: string,
    values: { stringValue: string }[]
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Lists", any, "firebaseAPI">>;

export type notificationSendType = MutationTrigger<MutationDefinition<{
    toId: string,
    getDate: (item: string) => string,
    text: string,
    fromPhoto: string | undefined,
    url: string
}, BaseQueryFn, never, boolean, "firebase">>;