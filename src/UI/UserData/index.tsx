import styles from './UserData.module.sass'
import { FC } from 'react'
import UserCircle from "../UserCircle";
import userPNG from "../../ASSET/icon-avatar.png";
import {IUserData} from "./Types.ts";

const UserData: FC<IUserData> = ({photo,
									 name,
									 secondaryText,
									 logoDopClass,
									 TextDopClass,
									 click,
									 loading,
									 isButton}) => {
	return (
		<section className={styles.UserData}>
			<UserCircle
				url={photo || userPNG}
				dopClass={`${styles.Avatar} 
				${logoDopClass}`}
				imgStyles={{filter: !photo ? 'var(--invertFilter)' : ''}}
				onclick={click}
				loading={loading} isButton={isButton}/>
			<span className={`${loading ? styles.LoadingText : TextDopClass}`}>
				<p>{name || 'Загрузка'}</p>
				<p>{secondaryText || 'Загрузка'}</p>
			</span>
		</section>
	)
}

export default UserData
export type {IUserData}
