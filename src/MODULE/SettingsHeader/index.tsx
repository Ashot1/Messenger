import styles from './SettingsHeader.module.sass'
import {FC, useRef, useState} from 'react'
import SettingsInfo from "../../ENTITY/SettingsInfo";
import SettingsMenu from "../../ENTITY/SettingsMenu";
import CustomButton from "../../UI/CustomButton";
import ModalWindow from "../../UI/ModalWindow";
import {useAppDispatch, useAppSelector} from "../../HOOK";
import {useNavigate} from "react-router-dom";
import {auth, FBstorage} from "../../firebaseInit.ts";
import {deleteUser, updateProfile} from "firebase/auth";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {changeUser} from "../../STORE/userSlice.ts";

const SettingsHeader: FC = () => {

	const user = useAppSelector(state => state.user),
		[Modal, setModal] = useState(false),
		Navigate = useNavigate(),
		[Error, setError] = useState(''),
		InputFile = useRef<HTMLInputElement>(null),
		dispatcher = useAppDispatch()

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

	const changeAvatar = () => {
		if(InputFile.current) InputFile.current.click()
	}

	const uploadAvatar = (e: any) => {
		const storageref = ref(FBstorage, `avatars/${auth.currentUser?.email}`)
		if(e.target.files[0])
			uploadBytes(storageref, e.target.files[0]).then(() => {
				getDownloadURL(storageref).then(response => {
					if(auth.currentUser)
						updateProfile(auth.currentUser, {
							photoURL: response
						}).then(() => {
							dispatcher(changeUser({userEmail: user.userEmail, userDisplayName: user.userDisplayName, userPhoto: response}))
						})
				})
			})
	}

	return (
		<div className={styles.Wrapper}>
			<input type="file" style={{display: "none"}} ref={InputFile} onChange={uploadAvatar} accept="image/*"/>
			<SettingsInfo email={user.userEmail} name={user.userDisplayName} photo={user.userPhoto} click={changeAvatar}>
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
