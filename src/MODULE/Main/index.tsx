import styles from './Main.module.sass'
import { FC } from 'react'
import {IMain} from "./Types.ts";
import {useAppSelector} from "../../HOOK";

const Main: FC<IMain> = ({children}) => {

	const user = useAppSelector(state => state.user)

	return (
		<main className={styles.main}>
			{user.ban
				? <p className={styles.BanText}>Вы навсегда заблокированы администрацией</p>
				: children}
		</main>
	)
}

export default Main
