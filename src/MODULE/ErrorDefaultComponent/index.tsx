import styles from './ErrorDefaultComponent.module.sass'
import { FC } from 'react'
import {IErrorDefaultComponent} from "./Types.ts";
import TransparentBlock from "../../UI/TransparentBlock";
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";

const ErrorDefaultComponent: FC<IErrorDefaultComponent> = ({type}) => {

	const Component = type === 'TransparentBlock' ? TransparentBlock : SettingsDefaultBlock

	return (
		<div className={styles.WrapperCenter}>
			<Component>
				<p style={{padding: '25px 50px'}}>Ошибка</p>
			</Component>
			{}
		</div>
	)
}

export default ErrorDefaultComponent
