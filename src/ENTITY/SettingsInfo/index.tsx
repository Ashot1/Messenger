import styles from './SettingsInfo.module.sass'
import {FC} from 'react'
import UserData from "../../UI/UserData";
import {IUserInfo} from "./Types.ts";

const SettingsInfo: FC<IUserInfo> = ({children,
										 name,
										 photo,
										 tag,
										 click,
										 loading}) => {

	return (
		<div className={styles.Info}>
			<UserData photo={photo} secondaryText={tag} name={name} logoDopClass={styles.HoverAvatar}
					  TextDopClass={styles.Text} click={click} loading={loading}/>
			<section className={styles.Actions}>
				{children}
			</section>
		</div>
	)
}

export default SettingsInfo
