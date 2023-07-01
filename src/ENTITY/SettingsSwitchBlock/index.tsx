import styles from './SettingsSwitchBlock.module.sass'
import {FC, useState} from 'react'
import {ISettingsSwitchBlock} from "./Types.ts";
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";
import SettingsOpenButton from "../../UI/SettingsOpenButton";
import WaveButton from "../../UI/WaveButton";

const SettingsSwitchBlock: FC<ISettingsSwitchBlock> = ({title, dopText, action}) => {

	const [OpenState, setOpenState] = useState(false)

	return (
		<>
			{OpenState &&
				<SettingsDefaultBlock>
					<div className={styles.SwitchBlock}>
						<h1>{title}</h1>
						<p>{dopText}</p>
					</div>
					<div className={styles.ButtonPosition}>
						<WaveButton onclick={action} color="#4487a2">Подтвердить</WaveButton>
						<WaveButton onclick={() => setOpenState(false)} color="var(--secondaryColor)">Закрыть</WaveButton>
					</div>
				</SettingsDefaultBlock>
			}
			{!OpenState && <SettingsOpenButton onclick={() => setOpenState(true)}>{title}</SettingsOpenButton>}
		</>
	)
}

export default SettingsSwitchBlock
