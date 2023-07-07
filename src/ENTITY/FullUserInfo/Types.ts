export interface IFullUserInfo {
    createdAt: string,
    lastSignIn?: string,
    signMethod?: string,
    adminRights: string,
    email: string,
    dopClass?: string,
    isVerified?: boolean
}