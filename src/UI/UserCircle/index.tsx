import styles from './UserCircle.module.sass'
import { FC } from 'react'
import {IUserCircle} from "./Types.ts";

const UserCircle: FC<IUserCircle> = ({url,
										 onclick,
										 dopClass,
										 imgStyles,
										 loading = false,
										 ...props}) => {
	return (
		<button type="button" className={`${styles.Avatar} ${dopClass}`} onClick={onclick} {...props}>
			<img src={loading ? '' : url} alt="" style={imgStyles} className={loading ? styles.Loading : undefined}/>
		</button>
	)
}

export default UserCircle
