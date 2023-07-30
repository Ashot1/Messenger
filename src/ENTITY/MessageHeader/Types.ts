import {UserFromList} from "../UserList";
import {messageList} from "../../STORE";

export interface IMessageHeader {
    PageUser: UserFromList,
    loading: boolean,
    messageList: messageList,
    pageID: string
}