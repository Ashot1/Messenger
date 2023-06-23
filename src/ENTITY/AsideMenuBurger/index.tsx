import styles from './AsideMenuBurger.module.sass'
import {FC, memo} from 'react'
import BurgerButton from "../../UI/BurgerButton";
import {setOpen} from "../../STORE/menuSlice.ts";
import {IAsideMenuBurger} from "./Types.ts";
import {useAppDispatch} from "../../HOOK";

const AsideMenuBurger: FC<IAsideMenuBurger> = ({isActive}) => {

	const dispatcher = useAppDispatch()

	return (
		<div className={isActive ? styles.activeOpenNav : styles.openNav}>
			<BurgerButton isActive={isActive} onclick={() => dispatcher(setOpen())} customActiveClass={styles.Arrow}/>
		</div>
	)
}

export default memo(AsideMenuBurger)
