import styles from './SettingsHeader.module.sass'
import { FC } from 'react'
import SettingsInfo from "../../ENTITY/SettingsInfo";
import SettingsMenu from "../../ENTITY/SettingsMenu";

const SettingsHeader: FC = () => {
	return (
		<div className={styles.Wrapper}>
			<SettingsInfo/>
			<SettingsMenu/>
		</div>
	)
}

export default SettingsHeader
