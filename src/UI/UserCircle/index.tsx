import styles from './UserCircle.module.sass'
import { FC } from 'react'
import {IUserCircle} from "./Types.ts";

const UserCircle: FC<IUserCircle> = ({url, onclick, dopClass, imgStyles,...props}) => {
	return (
		<button type="button" className={`${styles.Avatar} ${dopClass}`} onClick={onclick} {...props}>
			<img src={url} alt="" style={imgStyles}/>
		</button>
	)
}

export default UserCircle
