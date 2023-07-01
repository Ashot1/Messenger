import {ReactNode} from "react";

export interface ISettingsOpenButton {
    onclick?: () => void,
    children: string | ReactNode
}