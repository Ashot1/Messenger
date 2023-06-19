import {configureStore} from "@reduxjs/toolkit";
import menuReducer from './menuSlice.ts'
import userReducer from './userSlice.ts'

const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch