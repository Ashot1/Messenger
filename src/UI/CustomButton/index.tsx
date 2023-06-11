import styles from './CustomButton.module.sass'
import { FC, memo } from 'react'
import {NavLink} from "react-router-dom";
import {ICustomButton} from "./Types.ts";

const CustomButton: FC<ICustomButton> = memo((
	{onclick, children, dopClass, isLink, url, activeClass}
) => {

	if(isLink && url) return (
		<NavLink to={url} type="button" className={({ isActive }) => isActive ? `${styles.Button} ${dopClass} ${activeClass}` : `${styles.Button} ${dopClass}`}>
			{children}
		</NavLink>
	)

	return (
		<button type="button" className={`${styles.Button} ${dopClass}`} onClick={onclick}>
			{children}
		</button>
	)
})

export default CustomButton
