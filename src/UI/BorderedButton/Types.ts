import {ReactNode} from "react";

export interface IBorderedButton {
    children: string | ReactNode,
    click?: ()  => void
}