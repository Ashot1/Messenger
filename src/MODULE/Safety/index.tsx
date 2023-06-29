import { FC } from 'react'
import PasswordChangeBlock from "../../ENTITY/PasswordChangeBlock";
import styles from './Safety.module.sass'


const Password: FC = () => {
	return (
		<div className={styles.safetyContent}>
			<PasswordChangeBlock/>
		</div>
)
}

export default Password
