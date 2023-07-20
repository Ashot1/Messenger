import styles from './AsideMenu.module.sass'
import { FC } from 'react'
import AsideMenuContent from "../../ENTITY/AsideMenuContent";
import {IAsideMenu} from "./Types.ts";
import { useAppSelector } from "../../HOOK";
import AsideMenuBurger from "../../ENTITY/AsideMenuBurger";


const AsideMenu: FC<IAsideMenu> = ({PageList}) => {
	const isActive = useAppSelector(state => state.menu.isOpen)

	return (
		<aside className={styles.asideMenu} style={{width: isActive ? 'auto' : ''}}>
			<AsideMenuBurger isActive={isActive}/>
			<AsideMenuContent isActive={isActive} PageList={PageList}/>
		</aside>
	)
}

export default AsideMenu