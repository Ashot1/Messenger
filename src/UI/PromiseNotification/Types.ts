import {ReactNode} from "react";
import {Renderable, ValueOrFunction} from "react-hot-toast";

export interface IPromiseNotification {
    mainFunction: () => Promise<any>,
    successFunction: () => ValueOrFunction<Renderable, ReactNode>,

}