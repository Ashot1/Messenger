import { FC } from 'react'
import styles from './TransparentInput.module.sass'
import {ITransparentInput} from "./Types.ts";

const TransparentInput: FC<ITransparentInput> =
	({placeholder,
		 setValue,
		 Value,
		 TypeI = 'text',
		 dopClass,
		 ...props}) => {
	return (
		<input type={TypeI} placeholder={placeholder} className={`${styles.TransparentInput} ${dopClass}`} onChange={setValue} value={Value} {...props}/>
	);
}

export type {ITransparentInput}
export default TransparentInput