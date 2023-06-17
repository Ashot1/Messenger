import styles from './UserCircle.module.sass'
import { FC } from 'react'
import {IUserCircle} from "./Types.ts";

const UserCircle: FC<IUserCircle> = ({url, onclick, dopClass, ...props}) => {
	return (
		<button type="button" className={`${styles.Avatar} ${dopClass}`} onClick={onclick} {...props}>
			<img src={url} alt=""/>
		</button>
	)
}

export default UserCircle
