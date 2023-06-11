import {ReactNode} from "react";
import {MotionProps} from "framer-motion";

export interface IModalBlock extends MotionProps{
    children: ReactNode,
    dopClass?: string
}