import styles from './SettingsInfo.module.sass'
import {FC, useState} from 'react'
import {useAppSelector} from "../../HOOK";
import UserData from "../../UI/UserData";
import CustomButton from "../../UI/CustomButton";
import ModalWindow from "../../UI/ModalWindow";
import { deleteUser } from "firebase/auth";
import {auth} from "../../firebaseInit.ts";
import {useNavigate} from "react-router-dom";

const SettingsInfo: FC = () => {
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
		<div className={styles.Info}>
			<UserData photo={user.userPhoto} secondaryText={user.userEmail} name={user.userDisplayName} logoDopClass={styles.Avatar} TextDopClass={styles.Text}/>
			<section className={styles.Actions}>
				<CustomButton dopClass={styles.Delete} onclick={() => setModal(true)}>Удалить аккаунт</CustomButton>
			</section>
			{Modal && <ModalWindow width={50} bgClick={() => setModal(false)}>
				<h2 className={styles.ModalText}>Вы уверены, что хотите удалить аккаунт?</h2>
				<p className={styles.DopInfo}>После этого аккаунт нельзя будет восстановить</p>
				<p className={styles.DopInfo} style={{color: 'red'}}>{Error}</p>
				<div className={styles.ModalButtons}>
					<CustomButton onclick={userDelete} dopClass={styles.Quit}>Удалить</CustomButton>
					<CustomButton onclick={() => setModal(false)} dopClass={styles.Close}>Отмена</CustomButton>
				</div>
			</ModalWindow>}
		</div>
	)
}

export default SettingsInfo
