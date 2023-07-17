import {messageType} from "../../STORE/userSlice.ts";

export interface IMessageSendField {
    messagesPrev: messageType[],
    id: string,
    CurrentUserID: string
}