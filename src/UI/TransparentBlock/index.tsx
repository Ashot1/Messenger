import styles from './TransparentBlock.module.sass'
import { FC } from 'react'
import {ITransparentBlock} from "./Types.ts";

const TransparentBlock: FC<ITransparentBlock> = ({children, dopClass}) => {
	return (
		<div className={`${styles.TransparentBlock} ${dopClass}`}>
			{children}
		</div>
	)
}

export default TransparentBlock
