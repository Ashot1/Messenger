import styles from './CheckMark.module.sass'
import {FC, useId} from 'react'
import {ICheckMark} from "./Types.ts";

const CheckMark: FC<ICheckMark> = ({check, change}) => {
	const id = useId()
	return (
		<>
			<input type="checkbox" checked={check} onChange={change} id={id} className={styles.CustomInput}/>
			<label className={styles.adminLabel} htmlFor={id}/>
		</>
	)
}

export default CheckMark
