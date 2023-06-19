import styles from './FormField.module.sass'
import { FC } from 'react'
import TransparentInput from "../../UI/TransparentInput";
import {IFormField} from "./Types.ts";

const FormField: FC<IFormField> = ({title, type, Value, setValue, required}) => {
	return (
		<label htmlFor="email" className={styles.label}>
			{title}
			<TransparentInput TypeI={type} dopClass={styles.input} Value={Value} setValue={setValue} required={required}/>
		</label>
	)
}

export default FormField
