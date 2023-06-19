import {CSSProperties, HTMLAttributes, ReactNode} from "react";

export interface IWaveButton extends HTMLAttributes<HTMLButtonElement>{
    onclick: (e: MouseEvent) => void,
    children: ReactNode,
    color?: string
}

export interface ICustomCSS extends CSSProperties {
    "--Color": string
}