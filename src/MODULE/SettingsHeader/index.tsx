import styles from './SettingsHeader.module.sass'
import {FC, useState} from 'react'
import SettingsInfo from "../../ENTITY/SettingsInfo";
import SettingsMenu from "../../ENTITY/SettingsMenu";
import CustomButton from "../../UI/CustomButton";
import ModalWindow from "../../UI/ModalWindow";
import {useAppSelector} from "../../HOOK";
import {useNavigate} from "react-router-dom";
import {auth} from "../../firebaseInit.ts";
import {deleteUser} from "firebase/auth";

const SettingsHeader: FC = () => {

	const user = useAppSelector(state => state.user),
		[Modal, setModal] = useState(false),
		Navigate = useNavigate(),
		[Error, setError] = useState('')

	const userDelete = () => {
		const currentUser = auth.currentUser
		if(currentUser)
			deleteUser(currentUser).then(() => {
				Navigate('/auth')
			}).catch((e) => {
				if(e.message === 'Firebase: Error (auth/requires-recent-login).') return setError('Чтобы удалить пользователя необходимо перезайти на аккаунт')
				setError(e.message)
			});
	}

	return (
		<div className={styles.Wrapper}>
			<SettingsInfo email={user.userEmail} name={user.userDisplayName} photo={user.userPhoto}>
				<>
					<CustomButton dopClass={styles.Delete} onclick={() => setModal(true)}>Удалить аккаунт</CustomButton>
					{Modal && <ModalWindow width={50} bgClick={() => setModal(false)}>
						<h2 className={styles.ModalText}>Вы уверены, что хотите удалить аккаунт?</h2>
						<p className={styles.DopInfo}>После этого аккаунт нельзя будет восстановить</p>
						<p className={styles.DopInfo} style={{color: 'red'}}>{Error}</p>
						<div className={styles.ModalButtons}>
							<CustomButton onclick={userDelete} dopClass={styles.Quit}>Удалить</CustomButton>
							<CustomButton onclick={() => setModal(false)} dopClass={styles.Close}>Отмена</CustomButton>
						</div>
					</ModalWindow>}
				</>
			</SettingsInfo>
			<SettingsMenu/>
		</div>
	)
}

export default SettingsHeader
