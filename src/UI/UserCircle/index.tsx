import styles from './UserCircle.module.sass'
import { FC } from 'react'
import {IUserCircle} from "./Types.ts";

const UserCircle: FC<IUserCircle> = ({url,
										 onclick,
										 dopClass,
										 imgStyles,
										 loading = false,
										 isButton = true,
										 ...props}) => {
	if(isButton) return (
		<button type="button" className={`${styles.Avatar} ${dopClass}`} onClick={onclick} {...props}>
			<img src={loading ? '' : url} alt="" style={imgStyles} className={loading ? styles.Loading : undefined}/>
		</button>
	)

	return (
		<div className={`${styles.Avatar} ${dopClass}`}>
			<img src={loading ? '' : url} alt="" style={imgStyles} className={loading ? styles.Loading : undefined}/>
		</div>
	)
}

export default UserCircle
