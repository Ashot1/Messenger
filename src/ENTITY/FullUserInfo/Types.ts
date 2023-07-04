export interface IFullUserInfo {
    createdAt: string,
    lastSignIn: string,
    signMethod?: string,
    Needversion?: boolean,
    loading?: boolean,
    adminRights: string,
    email?: string
}