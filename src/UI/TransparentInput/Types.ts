import {ChangeEvent, DetailedHTMLProps} from "react";
import {Path, RegisterOptions, UseFormRegister} from "react-hook-form";

export type Inputs = {
    Name: string,
    Email: string,
    Password: string,
    tag: string
}

export interface ITransparentInput extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    setValue?: (e: ChangeEvent<HTMLInputElement>) => void,
    Value?: string,
    TypeI?: string,
    dopClass?: string,
    register?: UseFormRegister<Inputs>,
    label?: Path<Inputs>,
    options?: RegisterOptions
}