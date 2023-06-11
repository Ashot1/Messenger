import styles from './Header.module.sass'
import { FC } from 'react'
import {IHeader} from "./Types.ts";
import HeaderInfoBar from "../../ENTITY/HeaderInfoBar";
import HeaderActionsBar from "../../ENTITY/HeaderActionsBar";

const Header: FC<IHeader> = ({children}) => {
	return (
		<header className={styles.Header}>
			<HeaderInfoBar>
				{children}
			</HeaderInfoBar>
			<HeaderActionsBar/>
		</header>
	)
}

export default Header
