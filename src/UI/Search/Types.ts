import {UseFormRegister} from "react-hook-form";

export interface ISearch {
    register: UseFormRegister<{ Search: string }>
}