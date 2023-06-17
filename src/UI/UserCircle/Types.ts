import {HTMLAttributes} from "react";

export interface IUserCircle extends HTMLAttributes<HTMLButtonElement>{
    url: string,
    onclick?: () => void,
    dopClass?: string
}