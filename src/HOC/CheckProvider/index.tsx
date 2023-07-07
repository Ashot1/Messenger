import {FC, ReactNode} from 'react'
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";
import styles from "./CheckProvider.module.sass";

const CheckProvider: FC<{children: ReactNode, condition: boolean, providerID: string, dopText: string}> = ({children,
																											   condition,
																											   providerID,
																											   dopText}) => {

	if(!condition)
		return (
			<SettingsDefaultBlock>
				<p className={styles.cantChangeText}>Вы вошли с помощью {providerID} и {dopText}</p>
			</SettingsDefaultBlock>
		)

		return children
}

export default CheckProvider
