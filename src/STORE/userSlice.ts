import {createSlice} from "@reduxjs/toolkit";

type InitialType = {
    userEmail: string | undefined,
    userDisplayName: string | undefined,
    userPhoto: string | undefined,
    loading: boolean
}

const initialState: InitialType = {
    userEmail: undefined,
    userDisplayName: undefined,
    userPhoto: undefined,
    loading: true
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUser: (state, action) => {
            state.userEmail = action.payload.userEmail;
            state.userDisplayName = action.payload.userDisplayName;
            state.userPhoto = action.payload.userPhoto;
            state.loading = false
        }
    }
})

export const {changeUser} = userSlice.actions
export default userSlice.reducer