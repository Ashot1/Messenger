import {ReactNode} from "react";

export interface IUserInfo {
    children: ReactNode,
    photo?: string,
    email?: string,
    name?: string
}