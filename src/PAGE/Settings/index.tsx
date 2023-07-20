import styles from './Settings.module.sass'
import {FC} from 'react'
import SettingsHeader from "../../MODULE/SettingsHeader";
import LoadingSettings from "./LoadingSettings.tsx"

import {Navigate, Outlet, useLocation} from "react-router-dom";

const Settings: FC = () => {
	const location = useLocation()

	if(location.pathname === "/settings") return <Navigate to="/settings/main"/>


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
export {LoadingSettings}