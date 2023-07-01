import {FC, useState} from "react";
import FormField from "../FormField";
import WaveButton from "../../UI/WaveButton";
import styles from './SettingsChangeBlock.module.sass'
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";
import {ISettingsChangeBlock} from "./Types.ts";
import SettingsOpenButton from "../../UI/SettingsOpenButton";


const SettingsBlock: FC<ISettingsChangeBlock> = ({errors,
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
			{OpenState &&
				<SettingsDefaultBlock>
					<form onSubmit={handleSubmit(SubmitFunction)} className={styles.ChangeForm}>
						<FormField title={title} register={register} label={label} options={options}
								   errors={errors} type={type}/>
						<div className={styles.ButtonPosition}>
							<WaveButton color="#4487a2">Сохранить</WaveButton>
							<WaveButton color="var(--secondaryColor)" onclick={e => {
								e.preventDefault()
								setOpenState(false)
							}}>Закрыть</WaveButton>
						</div>
					</form>
				</SettingsDefaultBlock>}
			{!OpenState && <SettingsOpenButton onclick={() => setOpenState(true)}>{title}</SettingsOpenButton>}
		</>
	)
}

export default SettingsBlock
