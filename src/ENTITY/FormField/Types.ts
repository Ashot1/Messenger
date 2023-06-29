import { ITransparentInput } from "../../UI/TransparentInput/Types.ts";
import {FieldError} from "react-hook-form";

export interface IFormField extends Pick<ITransparentInput, "label" | "register" | "options">{
    title: string,
    type?: string,
    errors?: FieldError,
}