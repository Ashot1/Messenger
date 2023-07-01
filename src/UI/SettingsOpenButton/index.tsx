import styles from './SettingsOpenButton.module.sass'
import { FC } from 'react'
import CustomButton from "../CustomButton";
import {ISettingsOpenButton} from "./Types.ts";

const SettingsOpenButton: FC<ISettingsOpenButton> = ({onclick, children}) => {
	return (
		<CustomButton onclick={onclick} dopClass={styles.OpenFormButton}>{children}</CustomButton>
	)
}

export default SettingsOpenButton
