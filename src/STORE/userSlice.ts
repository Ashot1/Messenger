import {createSlice} from "@reduxjs/toolkit";

export type messageType = {
    date: string,
    isChecked: boolean,
    text: string,
    media?: string,
    mediaGroup?: string[],
    from: string
}

export type notificationType = {text: string, createAt: string, icon: string, url: string}

export type UserInitialType = {
    userEmail: string | undefined,
    userDisplayName: string | undefined,
    userPhoto: string | undefined,
    tag: string | undefined,
    uid: string | undefined,
    loading: { [key: string]: boolean }
    addAdmin: boolean,
    addNews: boolean,
    canBanUsers: boolean,
    ban: boolean,
    acceptListTo: string[],
    acceptListFrom: string[],
    banList: string[],
    friendList: string[],
    settings: {canAddToFriends: boolean, canOtherMessage: boolean, canOtherSeePosts: boolean},
    posts: {title: string, content: string, createAt: string}[],
    notifications: notificationType[],
    messages: {id: string, users: string[], type: string, message: messageType[]}[]
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
        loadingNotifications: true,
        loadingMessages: true
    },
    addAdmin: false,
    addNews: false,
    canBanUsers: false,
    ban: false,
    friendList: [],
    banList: [],
    acceptListTo: [],
    acceptListFrom: [],
    settings: {canAddToFriends: false, canOtherMessage: false, canOtherSeePosts: false},
    posts: [],
    notifications: [],
    messages: []
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
            state.ban = action.payload.ban
        },
        changeAdminRights: (state, action) => {
            state.addAdmin = action.payload.addAdmin
            state.addNews = action.payload.addNews
            state.canBanUsers = action.payload.canBanUsers
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
        changeMessages: (state, action) => {
            state.messages = action.payload.messages
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
    changeMessages,
} = userSlice.actions
export default userSlice.reducer