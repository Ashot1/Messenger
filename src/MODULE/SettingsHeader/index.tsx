import styles from './SettingsHeader.module.sass'
import {FC, useRef, useState} from 'react'
import SettingsInfo from "../../ENTITY/SettingsInfo";
import Menu from "../../ENTITY/Menu";
import CustomButton from "../../UI/CustomButton";
import ModalWindow from "../../UI/ModalWindow";
import {useAppDispatch, useAppSelector} from "../../HOOK";
import {auth, db, FBstorage} from "../../firebaseInit.ts";
import {deleteUser} from "firebase/auth";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {changeUser} from "../../STORE/userSlice.ts";
import {doc, deleteDoc, updateDoc} from "firebase/firestore";
import BorderedButton from "../../UI/BorderedButton";

const SettingsHeader: FC = () => {

	const user = useAppSelector(state => state.user),
		[Modal, setModal] = useState(false),
		[Error, setError] = useState(''),
		InputFile = useRef<HTMLInputElement>(null),
		dispatcher = useAppDispatch()

	const userDelete = () => {
		const currentUser = auth.currentUser
		if(currentUser)
			deleteUser(currentUser).then(async () => {
				deleteDoc(doc(db, "Users", currentUser.uid)).then(() => {
					window.location.reload()
				}).catch(e => setError(e.message))
			}).catch((e) => {
				if(e.message === 'Firebase: Error (auth/requires-recent-login).') return setError('Чтобы удалить пользователя необходимо перезайти на аккаунт')
				setError(e.message)
			});

	}

	const changeAvatar = () => {
		if(InputFile.current) InputFile.current.click()
	}

	const uploadAvatar = (e: any) => {
		const storageref = ref(FBstorage, `avatars/${auth.currentUser?.uid}`)
		if(e.target.files[0])
			uploadBytes(storageref, e.target.files[0]).then(() => {
				getDownloadURL(storageref).then(response => {
					if(auth.currentUser)
						updateDoc(doc(db, "Users", auth.currentUser.uid), {photo: response}).then(() => {
							dispatcher(changeUser(
								{userEmail: user.userEmail, userDisplayName: user.userDisplayName, userPhoto: response, tag: user.tag, uid: user.uid}
							))
						})
				})
			})
	}

	return (
		<div className={styles.Wrapper}>
			<input type="file" style={{display: "none"}} ref={InputFile} onChange={uploadAvatar} accept="image/*"/>
			<SettingsInfo tag={`@${user.tag}`} name={user.userDisplayName} photo={user.userPhoto} click={changeAvatar} loading={user.loading}>
				<>
					<BorderedButton BGColor="var(--redColor)" color="#fff" reversed click={() => setModal(true)}> Удалить аккаунт</BorderedButton>
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
			<Menu content={[{url: "/settings/main", title: "Основное"}, {url: "/settings/safety", title: "Безопасность"}]}/>
		</div>
	)
}

export default SettingsHeader
