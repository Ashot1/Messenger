import styles from './SettingsInfo.module.sass'
import {FC} from 'react'
import UserData from "../../UI/UserData";
import {IUserInfo} from "./Types.ts";

const SettingsInfo: FC<IUserInfo> = ({children, name, photo, email, click}) => {

	return (
		<div className={styles.Info}>
			<UserData photo={photo} secondaryText={email} name={name} logoDopClass={styles.Avatar} TextDopClass={styles.Text} click={click}/>
			<section className={styles.Actions}>
				{children}
			</section>
		</div>
	)
}

export default SettingsInfo
