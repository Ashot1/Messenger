import styles from './SettingsDefaultBlock.module.sass'
import {FC} from 'react'
import {ISettingsBlock} from "./Types.ts";



const SettingsDefaultBlock: FC<ISettingsBlock> = ({children}) => {

	return (
		<div className={styles.SettingsBlock}>
			{children}
		</div>
	)
}

export default SettingsDefaultBlock