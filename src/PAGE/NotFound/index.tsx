import styles from './NotFound.module.sass'
import { FC } from 'react'
import {Navigate} from "react-router-dom";

const NotFound: FC = () => {
	return (
		<>
			<Navigate to="/notfound"/>
			<div className={styles.NotFound}>
				В разработке
			</div>
		</>

)
}

export default NotFound
