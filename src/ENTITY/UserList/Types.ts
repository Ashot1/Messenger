export type UserFromList = {
    photo: string,
    name: string,
    tag: string,
    uid: string
}

export interface IUserList {
    users: UserFromList[],
    title?: string,
    isLoading?: boolean
}