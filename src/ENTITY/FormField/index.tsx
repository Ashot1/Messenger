import styles from './FormField.module.sass'
import { FC } from 'react'
import TransparentInput from "../../UI/TransparentInput";
import {IFormField} from "./Types.ts";

const FormField: FC<IFormField> = ({
									   title,
									   type,
									   register,
									   label,
									   errors,
									   options,
									   dopClass,
									   ...props}) => {
	return (
		<label className={styles.label}>
			{title}	<span style={{color: 'red', margin: 0}}>{errors && '*'}</span>
			<TransparentInput TypeI={type} dopClass={`${styles.input} ${dopClass}`} register={register} options={options} label={label} {...props}/>
			<p style={{color: 'red', margin: 0}}>{errors?.message}</p>
		</label>
	)
}

export default FormField
export type {IFormField}