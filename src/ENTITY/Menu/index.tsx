import styles from './Menu.module.sass'
import { FC } from 'react'
import CustomButton from "../../UI/CustomButton";
import {IMenu} from "./Types.ts";

const Menu: FC<IMenu> = ({content}) => {
	return (
		<div className={styles.Menu}>
			{content.map(item => (
				<CustomButton key={item.url} isLink url={item.url} dopClass={styles.Navigate} activeClass={styles.Active}>{item.title}</CustomButton>
			))}
		</div>
	)
}

export default Menu
