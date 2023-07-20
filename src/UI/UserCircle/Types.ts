import {CSSProperties, HTMLAttributes} from "react";

export interface IUserCircle extends HTMLAttributes<HTMLButtonElement>{
    url: string,
    onclick?: () => void,
    dopClass?: string,
    imgStyles?: CSSProperties,
    loading?: boolean,
    isButton?: boolean
}