import styles from './BorderedButton.module.sass'
import { FC } from 'react'
import {IBorderedButton} from "./Types.ts";
import {Link} from "react-router-dom";

const BorderedButton: FC<IBorderedButton> = ({children,
												 click,
												 BGColor = 'var(--primaryBGcolorvar2)',
												 color = "var(--MainColor)",
												 url,
												 dopClass,
												 reversed}) => {

	if(url) return (
		<Link to={url} className={`${reversed ? styles.CloseButtonReversed : styles.CloseButton} ${dopClass}`} style={{"--BGColor": BGColor, "--color": color} as {[key: string]: string}}>{children}</Link>
	)

	return (
		<button className={`${reversed ? styles.CloseButtonReversed : styles.CloseButton} ${dopClass}`} style={{"--BGColor": BGColor, "--color": color} as {[key: string]: string}} onClick={click}>{children}</button>
	)
}

export default BorderedButton
