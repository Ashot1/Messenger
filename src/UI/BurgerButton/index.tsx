import styles from './BurgerButton.module.sass'
import { FC } from 'react'
import {IBurgerButton} from "./Types.ts";

const BurgerButton: FC<IBurgerButton> = ({isActive, dopClass, customActiveClass, onclick, isLoading}) => {

	return (
		<div className={`${styles.Position} ${dopClass}`} onClick={onclick} style={{height: isActive ? '40px' : ''}}>
			<span className={`${styles.Burger} ${isLoading ? styles.loadingColor : styles.basicColor} ${isActive ? customActiveClass || styles.BurgerActive : ''}`}></span>
		</div>
)
}

export default BurgerButton
