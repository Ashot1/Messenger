import styles from './Settings.module.sass'
import {FC} from 'react'
import SettingsHeader from "../../MODULE/SettingsHeader";

import {Outlet} from "react-router-dom";

const Settings: FC = () => {

	return (
		<div className={styles.Settings}>
			<div className={styles.content}>
				<SettingsHeader/>
				<Outlet/>
			</div>
		</div>
	)
}

export default Settings
