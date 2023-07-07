import {ReactNode} from "react";

export interface IBorderedButton {
    children: string | ReactNode,
    click?: ()  => void,
    BGColor?: string,
    color?: string,
    url?: string,
    dopClass?: string,
    reversed?: boolean
}