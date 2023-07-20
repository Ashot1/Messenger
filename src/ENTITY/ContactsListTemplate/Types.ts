import {UserFromList} from "../UserList";
import {ReactNode} from "react";

export interface IContactsLIstTemplate {
    children: ReactNode | string,
    data: UserFromList[],
    loading?: boolean,
    type?: "acceptTo" | "acceptFrom"
}