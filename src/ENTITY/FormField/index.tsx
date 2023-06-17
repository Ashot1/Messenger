// import styles from './FormField.module.sass'
import { FC } from 'react'
import TransparentInput from "../../UI/TransparentInput/TransparentInput.tsx";
import {IFormField} from "./Types.ts";

const FormField: FC<IFormField> = ({title, type}) => {
	return (
		<label htmlFor="email">
			{title}
			<TransparentInput TypeI={type}/>
		</label>
	)
}

export default FormField
