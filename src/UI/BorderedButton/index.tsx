import styles from './BorderedButton.module.sass'
import { FC } from 'react'
import {IBorderedButton} from "./Types.ts";
import {Link} from "react-router-dom";
import {motion} from 'framer-motion'

const BorderedButton: FC<IBorderedButton> = ({children,
												 click,
												 BGColor = 'var(--primaryBGcolorvar2)',
												 color = "var(--MainColor)",
												 url,
												 dopClass,
												 reversed}) => {

	const variant = {
		whileTap: {scale: .9}
	}

	if(url) return (
		<Link to={url} className={`${reversed ? styles.CloseButtonReversed : styles.CloseButton} ${dopClass}`} style={{"--BGColor": BGColor, "--color": color} as {[key: string]: string}}>{children}</Link>
	)

	return (
		<motion.button
			variants={variant}
			whileTap="whileTap"
			className={`${reversed ? styles.CloseButtonReversed : styles.CloseButton} ${dopClass}`}
			style={{"--BGColor": BGColor, "--color": color} as {[key: string]: string}} onClick={click}>{children}</motion.button>
	)
}

export default BorderedButton
