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
					<form onSubmit={(e) => {
						createPost(e)
						setOpenState(false)
					}}>
						<TransparentInput placeholder="Название" dopClass={styles.Title} required/>
						<Content/>
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

const Content: FC = () => {

	const [Symbols, setSymbols] = useState(0)

	return (
		<div style={{position: 'relative'}}>
			<textarea className={styles.Content}
					  required
					  onChange={(e) => setSymbols(e.target.value.length)}
						maxLength={5000}></textarea>
			<span className={styles.symbolNumber}>{Symbols}/5000</span>
		</div>
	)
}