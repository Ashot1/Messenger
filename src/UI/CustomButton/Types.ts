import {HTMLAttributes, ReactNode} from "react";

export interface ICustomButton extends HTMLAttributes<HTMLButtonElement>{
    onclick?: () => void,
    children: ReactNode,
    dopClass?: string,
    isLink?: boolean,
    url?: string,
    activeClass?: string
}
