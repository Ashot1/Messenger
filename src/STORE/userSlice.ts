import {createSlice} from "@reduxjs/toolkit";

export type UserInitialType = {
    userEmail: string | undefined,
    userDisplayName: string | undefined,
    userPhoto: string | undefined,
    tag: string | undefined,
    uid: string | undefined,
    loading: boolean,
    addAdmin: boolean,
    addNews: boolean,
    ban: boolean
}

const initialState: UserInitialType = {
    userEmail: undefined,
    userDisplayName: undefined,
    userPhoto: undefined,
    tag: undefined,
    uid: undefined,
    loading: true,
    addAdmin: false,
    addNews: false,
    ban: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUser: (state, action) => {
            state.userEmail = action.payload.userEmail;
            state.userDisplayName = action.payload.userDisplayName;
            state.userPhoto = action.payload.userPhoto;
            state.tag = action.payload.tag;
            state.uid = action.payload.uid;
            state.loading = false
        },
        changeAdminRights: (state, action) => {
            state.addAdmin = action.payload.addDeleteAdm
            state.addNews = action.payload.addNews
            state.ban = action.payload.ban
            state.loading = false
        },
        stopLoading: (state) => {
            state.loading = false
        },
    }
})

export const {
    changeUser,
    stopLoading,
    changeAdminRights,
} = userSlice.actions
export default userSlice.reducer