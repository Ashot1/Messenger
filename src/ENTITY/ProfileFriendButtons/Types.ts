import {PageUserType, UserInfo} from "../../MODULE/ProfileHeader";
import {listsMutationType, notificationSendType, UserInitialType} from "../../STORE";

export interface IProfileFriendsButton {
    id: string,
    User: UserInfo,
    PageUserLists: PageUserType
}

export interface IAcceptDenyButton {
    id: string,
    PageUserLists?: PageUserType
}

export interface IDeleteFromContactsFunction {
    userSelector: UserInitialType,
    changeParam: listsMutationType,
    id: string,
    PageUserLists: PageUserType,
    getDate: (arg: string) => string,
    createNotifServer?: notificationSendType,
}