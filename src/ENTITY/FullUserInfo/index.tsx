import styles from './FullUserInfo.module.sass'
import { FC } from 'react'
import {IFullUserInfo} from "./Types.ts";
import {version} from '../../../package.json'
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";

const FullUserInfo: FC<IFullUserInfo> = ({lastSignIn,
											 signMethod,
											 createdAt,
											 Needversion,
											 adminRights,
											 email,
											 loading= false}) => {
	return (
		<SettingsDefaultBlock>
			<div className={loading ? styles.loading : styles.UserInfo}>
				<p>Email: </p> <span>{!loading && email}</span>
				<hr/>
				<p>Зарегистрирован: </p> <span>{!loading && createdAt}</span>
				<hr/>
				<p>Последний вход в аккаунт: </p> <span>{!loading && lastSignIn}</span>
				<hr/>
				{signMethod &&<p>Метод входа: {!loading && (signMethod === 'password' ? 'Email и пароль' : signMethod)}</p>}
				<p>Права администратора: {adminRights}</p>
				{Needversion && <p>Версия приложения: {version}</p>}
			</div>
		</SettingsDefaultBlock>
	)
}

export default FullUserInfo
