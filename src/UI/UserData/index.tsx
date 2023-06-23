import styles from './UserData.module.sass'
import { FC } from 'react'
import UserCircle from "../UserCircle";
import userPNG from "../../ASSET/icon-avatar.png";
import {IUserData} from "./Types.ts";

const UserData: FC<IUserData> = ({photo, name, secondaryText, logoDopClass, TextDopClass}) => {
	return (
		<section className={styles.UserData}>
			<UserCircle url={photo || userPNG} dopClass={logoDopClass} imgStyles={{filter: !photo ? 'var(--invertFilter)' : ''}}/>
			<span className={TextDopClass}>
				<p>{name || 'Загрузка'}</p>
				<p>{secondaryText || 'Загрузка'}</p>
			</span>
		</section>
	)
}

export default UserData
