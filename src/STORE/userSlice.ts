import {createSlice} from "@reduxjs/toolkit";

export type UserInitialType = {
    userEmail: string | undefined,
    userDisplayName: string | undefined,
    userPhoto: string | undefined,
    tag: string | undefined,
    uid: string | undefined,
    loadingInfo: boolean,
    loadingLists: boolean,
    loadingAcceptFrom: boolean,
    addAdmin: boolean,
    addNews: boolean,
    ban: boolean,
    acceptListTo: string[],
    acceptListFrom: string[],
    banList: string[],
    friendList: string[],
}

const initialState: UserInitialType = {
    userEmail: undefined,
    userDisplayName: undefined,
    userPhoto: undefined,
    tag: undefined,
    uid: undefined,
    loadingInfo: true,
    loadingLists: true,
    loadingAcceptFrom: true,
    addAdmin: false,
    addNews: false,
    ban: false,
    friendList: [],
    banList: [],
    acceptListTo: [],
    acceptListFrom: [],
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
        },
        changeAdminRights: (state, action) => {
            state.addAdmin = action.payload.addDeleteAdm
            state.addNews = action.payload.addNews
            state.ban = action.payload.ban
        },
        changeLists: (state, action) => {
            state.acceptListTo = action.payload.acceptListTo
            state.friendList = action.payload.friendList
            state.banList = action.payload.banList
        },
        changeAcceptFromList: (state, action) => {
            state.acceptListFrom = action.payload.acceptListFrom
        },
        stopLoadingInfo: (state) => {
            state.loadingInfo = false
        },
        stopLoadingLists: (state) => {
            state.loadingLists = false
        },
        stopLoadingAcceptFrom: (state) => {
            state.loadingAcceptFrom = false
        },
    }
})

export const {
    changeUser,
    stopLoadingInfo,
    stopLoadingLists,
    stopLoadingAcceptFrom,
    changeAdminRights,
    changeLists,
    changeAcceptFromList,
} = userSlice.actions
export default userSlice.reducer