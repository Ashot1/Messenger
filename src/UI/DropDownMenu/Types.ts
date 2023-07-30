import {ReactNode} from "react";

export interface IDropDownMenu {
    children: ReactNode,
    list: ReactNode,
    dopClassWrapper?: string,
    needArrow?: boolean,
    dopClassList?: string
}