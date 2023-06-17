import {HTMLAttributes, ReactNode} from "react";
import {MotionProps} from "framer-motion";

export interface IModalBlock extends MotionProps, Omit<HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style"> {
    children: ReactNode,
    dopClass?: string
}