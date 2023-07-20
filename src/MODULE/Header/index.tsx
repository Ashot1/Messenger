import styles from './Header.module.sass'
import { FC } from 'react'
import {IHeader} from "./Types.ts";
import HeaderInfoBar from "../../ENTITY/HeaderInfoBar";
import HeaderActionsBar from "../../ENTITY/HeaderActionsBar";

const Header: FC<IHeader> = ({children}) => {
	const HeaderPos = localStorage.getItem("headerPos")

	return (
		<header className={`${styles.Header} ${HeaderPos === 'sticky' ? styles.HeaderSticky : ''}`}>
			<HeaderInfoBar>
				{children}
			</HeaderInfoBar>
			<HeaderActionsBar/>
		</header>
	)
}

export default Header
