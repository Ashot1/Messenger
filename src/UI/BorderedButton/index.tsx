import styles from './BorderedButton.module.sass'
import { FC } from 'react'
import CustomButton from "../CustomButton";
import {IBorderedButton} from "./Types.ts";

const BorderedButton: FC<IBorderedButton> = ({children, click }) => {
	return (
		<CustomButton dopClass={styles.CloseButton}
					  onclick={click}>{children}</CustomButton>

	)
}

export default BorderedButton
