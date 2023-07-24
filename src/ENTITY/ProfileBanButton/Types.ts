import {PageUserType} from "../../MODULE/ProfileHeader";
import {listsMutationType, UserInitialType} from "../../STORE";

export interface IBanButton {
    PageUserLists: PageUserType,
    id: string,
    userBanState: boolean | undefined
}

export interface IBlockFunction {
    currentUser: UserInitialType,
    changeParam: listsMutationType,
    id: string,
    PageUserLists: PageUserType,
    getDate: (arg: string) => string,
}

export interface IUnblockUser extends Pick<IBlockFunction, 'changeParam' | 'currentUser' | 'id'> {}