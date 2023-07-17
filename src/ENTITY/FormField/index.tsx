import styles from './FormField.module.sass'
import {FC, useId} from 'react'
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
	const id = useId()

	return (
		<div style={{position: 'relative'}}>
			<label className={styles.label} htmlFor={id}>
				{title}	<span style={{color: 'red', margin: 0}}>{errors && '*'}</span>
			</label>
			<TransparentInput
				TypeI={type}
				dopClass={`${styles.input} ${dopClass}`}
				register={register} options={options} label={label} id={id} {...props}/>
			<p style={{color: 'red', marginBottom: '50px'}}>{errors?.message}</p>
		</div>
	)
}

export default FormField
export type {IFormField}