import {createSlice} from "@reduxjs/toolkit";

type InitialType = {
    userEmail: string | undefined,
    userDisplayName: string | undefined,
    userPhoto: string | undefined,
    loading: boolean,
    addDeleteAdm: boolean,
    addNews: boolean
}

const initialState: InitialType = {
    userEmail: undefined,
    userDisplayName: undefined,
    userPhoto: undefined,
    loading: true,
    addDeleteAdm: false,
    addNews: false,
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
        },
        changeAdminRights: (state, action) => {
            state.addDeleteAdm = action.payload.addDeleteAdm
            state.addNews = action.payload.addNews
        },
        stopLoading: (state) => {
            state.loading = false
        }
    }
})

export const {changeUser, stopLoading, changeAdminRights} = userSlice.actions
export default userSlice.reducer