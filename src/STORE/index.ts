import {configureStore} from "@reduxjs/toolkit";
import menuReducer from './menuSlice.ts'
import userReducer from './userSlice.ts'
import {UserInitialType} from './userSlice.ts'
import {firebaseAPI2} from "./firebaseAPI2.ts";
import {firebaseapi} from "./firebaseApi.ts";

const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer,
        [firebaseAPI2.reducerPath]: firebaseAPI2.reducer,
        [firebaseapi.reducerPath]: firebaseapi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(firebaseAPI2.middleware, firebaseapi.middleware)
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type {UserInitialType}