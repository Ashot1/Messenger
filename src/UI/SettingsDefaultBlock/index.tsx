import styles from './SettingsDefaultBlock.module.sass'
import {FC} from 'react'
import {ISettingsBlock} from "./Types.ts";


const SettingsDefaultBlock: FC<ISettingsBlock> = ({children, dopClass}) => {

	return (
		<div className={`${styles.SettingsBlock} ${dopClass}`}>
			{children}
		</div>
	)
}

export default SettingsDefaultBlock