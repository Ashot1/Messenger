import {createSlice} from "@reduxjs/toolkit";

type menuState = {
    isOpen: boolean
}

const initialState: menuState = {
    isOpen: false
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setOpen(state) {
            state.isOpen = !state.isOpen
        }
    }
})

export const {setOpen} = menuSlice.actions
export default menuSlice.reducer