import {UserInfo} from "../../MODULE/ProfileHeader";
import {IProfileHeader} from "../../MODULE/ProfileHeader/Types.ts";

export interface IAddAdminButton extends Pick<IProfileHeader, 'setUser'>{
    userPage: UserInfo,
    id: string
}