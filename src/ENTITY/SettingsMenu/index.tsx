import styles from './SettingsMenu.module.sass'
import { FC } from 'react'
import CustomButton from "../../UI/CustomButton";

const SettingsMenu: FC = () => {
	return (
		<div className={styles.Menu}>
			<CustomButton isLink url="/settings/main" dopClass={styles.Navigate} activeClass={styles.Active}>Основное</CustomButton>
			<CustomButton isLink url="/settings/safety" dopClass={styles.Navigate} activeClass={styles.Active}>Безопасность</CustomButton>
		</div>
	)
}

export default SettingsMenu
