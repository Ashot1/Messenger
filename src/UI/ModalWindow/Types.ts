import {HTMLAttributes, ReactNode} from "react";

export interface IModalWindow extends HTMLAttributes<HTMLDivElement> {
    width: number,
    children: string | ReactNode,
    bgClick?: () => void,
    openState: boolean
}