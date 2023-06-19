import {ChangeEvent, HTMLAttributes} from "react";

export interface ITransparentInput extends HTMLAttributes<HTMLInputElement>{
    setValue?: (e: ChangeEvent<HTMLInputElement>) => void,
    Value?: string,
    TypeI?: string,
    dopClass?: string,
    required?: boolean
}