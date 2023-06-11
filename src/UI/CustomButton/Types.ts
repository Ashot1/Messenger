import {ReactNode} from "react";

export interface ICustomButton{
    onclick?: () => void,
    children: ReactNode,
    dopClass?: string,
    isLink?: boolean,
    url?: string,
    activeClass?: string
}
