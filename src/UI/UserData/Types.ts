import {IUserCircle} from "../UserCircle/Types.ts";

export interface IUserData extends Pick<IUserCircle, "isButton">{
    photo?: string,
    name?: string,
    secondaryText?: string,
    logoDopClass?: string,
    TextDopClass?: string,
    click?: () => void,
    loading?: boolean
}