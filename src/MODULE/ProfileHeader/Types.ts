export type UserInfo = {
    name: string,
    tag: string,
    photo: string | undefined,
    settings: {canAddToFriends: boolean, canOtherMessage: boolean, canOtherSeePosts: boolean},
    posts: {title: string, content: string, createAt: string}[]
}

export interface IProfileHeader {
    Loading: boolean,
    id: string,
    User: UserInfo | undefined
}