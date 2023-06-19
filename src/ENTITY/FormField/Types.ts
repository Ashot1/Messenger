import {ITransparentInput} from "../../UI/TransparentInput";

export interface IFormField extends Pick<ITransparentInput, "Value" | "setValue" | "required">{
    title: string,
    type?: string,
}