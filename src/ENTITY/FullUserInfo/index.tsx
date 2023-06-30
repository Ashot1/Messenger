import styles from './FullUserInfo.module.sass'
import { FC } from 'react'
import {IFullUserInfo} from "./Types.ts";

const FullUserInfo: FC<IFullUserInfo> = ({lastSignIn, signMethod, createdAt}) => {
	return (
		<div className={styles.UserInfo}>
			<p>Зарегистрирован: </p> <span>{createdAt}</span>
			<hr/>
			<p>Последний вход в аккаунт: </p> <span>{lastSignIn}</span>
			<hr/>
			{signMethod &&<p>Метод входа: {signMethod === 'password' ? 'Email и пароль' : signMethod}</p>}
		</div>
	)
}

export default FullUserInfo
