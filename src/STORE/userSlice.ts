import {createSlice} from "@reduxjs/toolkit";

export type UserInitialType = {
    userEmail: string | undefined,
    userDisplayName: string | undefined,
    userPhoto: string | undefined,
    tag: string | undefined,
    uid: string | undefined,
    loading: { [key: string]: boolean }
    addAdmin: boolean,
    addNews: boolean,
    ban: boolean,
    acceptListTo: string[],
    acceptListFrom: string[],
    banList: string[],
    friendList: string[],
    settings: {canAddToFriends: boolean, canOtherMessage: boolean, canOtherSeePosts: boolean},
    posts: {title: string, content: string, createAt: string}[],
    notifications: {text: string, createAt: string, icon: string}[]
}

const initialState: UserInitialType = {
    userEmail: undefined,
    userDisplayName: undefined,
    userPhoto: undefined,
    tag: undefined,
    uid: undefined,
    loading: {
        loadingInfo: true,
        loadingLists: true,
        loadingAcceptFrom: true,
        loadingPosts: true,
        loadingNotifications: true
    },
    addAdmin: false,
    addNews: false,
    ban: false,
    friendList: [],
    banList: [],
    acceptListTo: [],
    acceptListFrom: [],
    settings: {canAddToFriends: false, canOtherMessage: false, canOtherSeePosts: false},
    posts: [],
    notifications: []
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
        changeSettings: (state, action) => {
            state.settings = action.payload.settings
        },
        changeAcceptFromList: (state, action) => {
            state.acceptListFrom = action.payload.acceptListFrom
        },
        changePosts: (state, action) => {
            state.posts = action.payload.posts
        },
        changeNotifications: (state, action) => {
            state.notifications = action.payload.notifications
        },
        stopLoading: (state, action) => {
            state.loading[action.payload] = false
        },
    }
})

export const {
    changeUser,
    stopLoading,
    changeAdminRights,
    changeLists,
    changeAcceptFromList,
    changeSettings,
    changePosts,
    changeNotifications,
} = userSlice.actions
export default userSlice.reducer