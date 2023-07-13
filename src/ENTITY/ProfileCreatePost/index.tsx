import styles from './ProfileCreatePost.module.sass'
import {FC, useState} from 'react'
import CreateButton from "../../UI/CreateButton";
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";
import TransparentInput from "../../UI/TransparentInput";
import BorderedButton from "../../UI/BorderedButton";
import {ICreatePost} from "./Types.ts";

const ProfileCreatePost: FC<ICreatePost> = ({createPost}) => {
	const [OpenState, setOpenState] = useState(false)

	return (
		<>
			{!OpenState && <CreateButton Click={() => setOpenState(true)}/>}
			{OpenState &&
				<SettingsDefaultBlock>
					<form onSubmit={createPost}>
						<TransparentInput placeholder="Название" dopClass={styles.Title} required/>
						<textarea className={styles.Content} required></textarea>
						<div className={styles.ButtonPosition}>
							<BorderedButton color="var(--InvertMainColor)"
											BGColor="var(--MainColor)">Опубликовать</BorderedButton>
							<BorderedButton color="var(--InvertMainColor)"
											BGColor="var(--MainColor)"
											click={() => setOpenState(false)}>Закрыть</BorderedButton>
						</div>
					</form>
				</SettingsDefaultBlock>
			}
		</>
	)
}

export default ProfileCreatePost
