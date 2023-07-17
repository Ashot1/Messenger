import styles from './FullUserInfo.module.sass'
import { FC } from 'react'
import {IFullUserInfo} from "./Types.ts";
import {version} from '../../../package.json'
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";

const FullUserInfo: FC<IFullUserInfo> = ({lastSignIn,
											 signMethod,
											 createdAt,
											 adminRights,
											 email,
											 dopClass,
											 isVerified = false,
											 needVersion = true}) => {
	return (
		<SettingsDefaultBlock>
			<div className={`${styles.UserInfo} ${dopClass}`}>
				{email && <><p>Email: </p> <span>{email} ({isVerified ? 'подтвержден' : 'не подтвержден'})</span>
				<hr/></>}
				{createdAt && <><p>Зарегистрирован: </p> <span>{createdAt}</span>
				<hr/></>}
				{lastSignIn && <><p>Последний вход в аккаунт: </p> <span>{lastSignIn}</span>
				<hr/></>}
				{signMethod &&<p>Метод входа: {(signMethod === 'password' ? 'Email и пароль' : signMethod)}</p>}
				<p>Права администратора: {adminRights}</p>
				{needVersion && <p>Версия приложения: {version}</p>}
			</div>
		</SettingsDefaultBlock>
	)
}

export default FullUserInfo
