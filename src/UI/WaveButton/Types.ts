import {CSSProperties, HTMLAttributes} from "react";

export interface IWaveButton extends HTMLAttributes<HTMLButtonElement>{
    onclick?: (e: any) => void,
    children: string,
    color?: string,
    dopClass?: string
}

export interface ICustomCSS extends CSSProperties {
    "--Color": string
}