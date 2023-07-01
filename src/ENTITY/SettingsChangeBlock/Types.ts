import {IFormField} from "../FormField";
import {UseFormHandleSubmit} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";

export interface ISettingsChangeBlock extends IFormField{
    handleSubmit: UseFormHandleSubmit<Inputs>,
    SubmitFunction: (data: Inputs) => void
}