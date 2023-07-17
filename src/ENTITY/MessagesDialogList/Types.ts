import {messageType} from "../../STORE/userSlice.ts";
import {UserFromList} from "../UserList";

export interface IMessagesDialogList {
    messages: messageType[],
    PageUser: UserFromList,
    loading: boolean
}