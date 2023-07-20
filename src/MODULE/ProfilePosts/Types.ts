import {UserInfo} from "../ProfileHeader";

export interface IProfilePosts {
    Loading: boolean,
    id: string,
    User: UserInfo | undefined,
    currentUserID: string | undefined,
    setUser: (user: UserInfo) => void
}