import styles from './BasicSettings.module.sass'
import { FC } from 'react'
import NameChangeBlock from "../../ENTITY/NameChangeBlock";
import EmailChangeBlock from "../../ENTITY/EmailChangeBlock";

const BasicSettings: FC = () => {


	return (
		<div className={styles.BasicSettings}>
			<NameChangeBlock/>
			<EmailChangeBlock/>
		</div>
	)
}

export default BasicSettings
