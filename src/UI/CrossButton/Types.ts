import {HTMLAttributes} from "react";

export interface ICrossButton extends HTMLAttributes<HTMLButtonElement>{
    isLink?: boolean,
    url?: string,
    click?: () => void;
}