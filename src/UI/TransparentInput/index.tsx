import { FC } from 'react'
import styles from './TransparentInput.module.sass'
import {ITransparentInput} from "./Types.ts";

const TransparentInput: FC<ITransparentInput> =
	({placeholder,
		 setValue,
		 Value,
		 TypeI = 'text',
		 dopClass,
		 required,
		 ...props}) => {
	return (
		<input type={TypeI} placeholder={placeholder} className={`${styles.TransparentInput} ${dopClass}`} onChange={setValue} value={Value} required={required} {...props}/>
	);
}

export type {ITransparentInput}
export default TransparentInput