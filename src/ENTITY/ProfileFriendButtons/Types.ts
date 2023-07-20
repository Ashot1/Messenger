import {UserInfo} from "../../MODULE/ProfileHeader";

export interface IProfileFriendsButton {
    id: string,
    User: UserInfo,
    PageUser: {friends: string[], acceptTo: string[]}
}

export interface IAcceptDenyButton {
    id: string,
    PageUser?: {friends: string[], acceptTo: string[]}
}