import {FC, useState} from "react";
import FormField from "../FormField";
import WaveButton from "../../UI/WaveButton";
import CustomButton from "../../UI/CustomButton";
import styles from './SettingsBlock.module.sass'
import {ISettingsBlock} from "./Types.ts";


const SettingsBlock: FC<ISettingsBlock> = ({errors,
										   options,
										   register,
										   title,
										   type,
										   label,
										   handleSubmit,
										   SubmitFunction}) => {
	const [OpenState, setOpenState] = useState(false);

	return (
		<>
			{OpenState && <form onSubmit={handleSubmit(SubmitFunction)} className={styles.ChangeForm}>
				<FormField title={title} register={register} label={label} options={options}
						   errors={errors} type={type}/>
				<div className={styles.ButtonPosition}>
					<WaveButton color="#4487a2">Сохранить</WaveButton>
					<WaveButton color="var(--secondaryColor)" onclick={e => {
						e.preventDefault()
						setOpenState(false)
					}}>Закрыть</WaveButton>
				</div>
			</form>}
			{!OpenState && <CustomButton onclick={() => setOpenState(true)} dopClass={styles.OpenFormButton}>{title}</CustomButton>}
		</>
	)
}

export default SettingsBlock
