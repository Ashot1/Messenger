import styles from './Main.module.sass'
import { FC } from 'react'
import {IMain} from "./Types.ts";

const Main: FC<IMain> = ({children}) => {

	return (
		<main className={styles.main}>
			{children}
		</main>
	)
}

export default Main
