import styles from './HeaderInfoBar.module.sass'
import { FC } from 'react'
import {IHeaderInfoBar} from "./Types.ts";

const HeaderInfoBar: FC<IHeaderInfoBar> = ({children}) => {
	return (
		<div className={styles.info}>
			{children}
		</div>
	)
}

export default HeaderInfoBar
