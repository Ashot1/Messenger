import styles from './CrossButton.module.sass'
import { FC } from 'react'
import {ICrossButton} from "./Types.ts";
import {Link} from "react-router-dom";

const CrossButton: FC<ICrossButton> = ({click, url, isLink, ...props}) => {
	if(url && isLink) return (
		<Link to={url} className={styles.cross}></Link>
	)

	return (
		<button className={styles.cross} onClick={click} {...props}>

		</button>
	)
}

export default CrossButton
