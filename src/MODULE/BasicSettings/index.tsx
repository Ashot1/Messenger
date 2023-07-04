import styles from './BasicSettings.module.sass'
import {FC, useState} from 'react'
import SettingsBlock from "../../ENTITY/SettingsChangeBlock";
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";
import {auth, db, FBstorage} from "../../firebaseInit.ts";
import {changeUser} from "../../STORE/userSlice.ts";
import {useAppDispatch, useAppSelector, useLocaleDate} from "../../HOOK";
import PromiseNotification from "../../UI/PromiseNotification";
import FullUserInfo from "../../ENTITY/FullUserInfo";
import SettingsSwitchBlock from "../../ENTITY/SettingsSwitchBlock";
import {ref, deleteObject} from "firebase/storage";
import toast from "react-hot-toast";
import {doc, updateDoc} from "firebase/firestore";

const BasicSettings: FC = () => {

	const {register,
		formState: {errors},
		handleSubmit,
		reset} = useForm<Inputs>({mode: "onSubmit"}),
		dispatch = useAppDispatch(),
		ToLocale = useLocaleDate(),
		userSelector = useAppSelector(state => state.user),
		[Theme, setTheme] = useState<string | null>(localStorage.getItem("theme"))

	const ChangeName = (data: Inputs) => {
		PromiseNotification({
			mainFunction: () => {
				if(!auth.currentUser) return Promise.reject(new Error)
				return updateDoc(doc(db, "Users", auth.currentUser.uid), {name: data.Name})
			},
			successFunction: () => {
				reset()
				return <b>Имя успешно изменено</b>
			}
		}).then(() => dispatch(changeUser({userEmail: userSelector.userEmail, userDisplayName: data.Name, userPhoto: userSelector.userPhoto, tag: userSelector.tag})))

	}

	const DeleteAvatar = () => {
		if(!userSelector.userPhoto)
			return toast.error("У вас отсутствует фото профиля",
			{style: {background: 'var(--primaryBGcolor)', color: 'var(--MainColor)'}, iconTheme: {primary: '#4487a2', secondary: '#fff'}})
		PromiseNotification({
			successFunction: () => {
				return <b>Фото профиля успешно удалено</b>
			},

			mainFunction: () => {
				if(!auth.currentUser) return Promise.reject(new Error)
				try{
					const avatar = ref(FBstorage, userSelector.userPhoto)
					return deleteObject(avatar)
				} catch(e) {
					return Promise.resolve()
				}
			}

		}).then(() => {
			if (!auth.currentUser) return new Error("Пользователь не найден")
			updateDoc(doc(db, 'Users', auth.currentUser.uid), {photo: ""})
				.then(() => {
					dispatch(changeUser({
						userEmail: userSelector.userEmail,
						userDisplayName: userSelector.userDisplayName,
						userPhoto: null,
						tag: userSelector.tag
					}))
				})
		})
	}

	const createdAt = auth.currentUser?.metadata.creationTime,
		lastSignIn = auth.currentUser?.metadata.lastSignInTime,
		providerID = auth.currentUser?.providerData[0].providerId,
		adminRights = userSelector.addNews ? 'наивысшие'
			: userSelector.addAdmin ? 'расширенные'
				: userSelector.ban ? 'базовые'
					: 'отсутствуют'

	if(createdAt && lastSignIn && providerID) return (
		<div className={styles.BasicSettings}>
			<FullUserInfo
				lastSignIn={ToLocale(lastSignIn)}
				createdAt={ToLocale(createdAt)}
				signMethod={providerID}
				Needversion
				loading={userSelector.loading}
				adminRights={adminRights}
				email={userSelector.userEmail}/>
			<SettingsBlock
				SubmitFunction={ChangeName}
				handleSubmit={handleSubmit}
				register={register}
				options={{required: true}}
				errors={errors.Name}
				label="Name"
				title="Изменить имя"
				type="text"/>
			<SettingsSwitchBlock action={DeleteAvatar}
			title="Удалить фото профиля"
			dopText="Вы уверены, что хотите удалить аватарку? Восстановить её будет невозможно"/>
			<SettingsSwitchBlock action={() => {
				const condition = Theme === 'darkmode' ? 'lightmode' : 'darkmode'
				localStorage.setItem('theme', condition)
				setTheme(condition)
				document.documentElement.dataset.theme = condition
			}}
			title="Изменить тему"
			dopText={`Изменить тему на ${Theme === 'darkmode' ? 'светлую' : 'темную'}`}/>
		</div>
	)
}

export default BasicSettings
