import { FC } from 'react'
import styles from './TransparentInput.module.sass'
import {ITransparentInput, Inputs} from "./Types.ts";

const TransparentInput: FC<ITransparentInput> =
	({placeholder,
		 setValue,
		 Value,
		 TypeI = 'text',
		 dopClass,
		 register,
		 label,
		 options,
		 ...props}) => {

	if(register && label) return (
		<input type={TypeI}
			   placeholder={placeholder}
			   className={`${styles.TransparentInput} ${dopClass}`}
			   {...register(label, options)} {...props}/>
	)

	return (
		<input type={TypeI}
			   placeholder={placeholder}
			   className={`${styles.TransparentInput} ${dopClass}`}
			   onChange={setValue} value={Value} {...props}/>
	);
}

export type {ITransparentInput}
export default TransparentInput

export type {Inputs}