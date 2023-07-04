import {ReactNode} from "react";
import {IUserData} from "../../UI/UserData";

export interface IUserInfo extends Pick<IUserData, "click">{
    children: ReactNode,
    photo?: string,
    tag?: string,
    name?: string,
    loading?: boolean
}