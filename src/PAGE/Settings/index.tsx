import styles from './Settings.module.sass'
import { FC } from 'react'
import SettingsHeader from "../../MODULE/SettingsHeader";

const Settings: FC = () => {
	return (
		<div className={styles.Settings}>
			<div className={styles.content}>
				<SettingsHeader/>
			</div>
		</div>
	)
}

export default Settings
