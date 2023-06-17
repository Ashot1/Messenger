import { FC } from 'react'
import styles from './TransparentInput.module.sass'
import {ITransparentInput} from "./Types.ts";

const TransparentInput: FC<ITransparentInput> =
	({placeholder, setValue, Value, TypeI = 'text', dopClass, ...props}) => {
	if(setValue && Value) return (
		<input type={TypeI} placeholder={placeholder} className={`${styles.TransparentInput} ${dopClass}`} onChange={setValue} value={Value} {...props}/>
	);
	return (
		<input type={TypeI} placeholder={placeholder} className={`${styles.TransparentInput} ${dopClass}`} {...props}/>
	)
}

export default TransparentInput