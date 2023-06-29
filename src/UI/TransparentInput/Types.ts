import {ChangeEvent, HTMLAttributes} from "react";
import {Path, RegisterOptions, UseFormRegister} from "react-hook-form";

export type Inputs = {
    Name: string,
    Email: string,
    Password: string
}

export interface ITransparentInput extends HTMLAttributes<HTMLInputElement>{
    setValue?: (e: ChangeEvent<HTMLInputElement>) => void,
    Value?: string,
    TypeI?: string,
    dopClass?: string,
    register?: UseFormRegister<Inputs>,
    label?: Path<Inputs>,
    options?: RegisterOptions
}