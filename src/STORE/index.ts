import {configureStore} from "@reduxjs/toolkit";
import menuReducer from './menuSlice.ts'
import userReducer from './userSlice.ts'
import {firebaseapi} from "./firebaseApi.ts";

const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer,
        [firebaseapi.reducerPath]: firebaseapi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(firebaseapi.middleware)
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch