import styles from './CreateButton.module.sass'
import { FC } from 'react'
import CustomButton from "../CustomButton";
import {ICreateButton} from "./Types.ts";

const CreateButton: FC<ICreateButton> = ({Click}) => {
	return (
		<CustomButton dopClass={styles.createButton}
					  onclick={Click}>+</CustomButton>
	)
}

export default CreateButton
