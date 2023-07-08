import styles from './BasicSettings.module.sass'
import {FC, useState} from 'react'
import SettingsBlock from "../../ENTITY/SettingsChangeBlock";
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";
import {auth, db} from "../../firebaseInit.ts";
import {changeUser} from "../../STORE/userSlice.ts";
import {useAppDispatch, useAppSelector, useLocaleDate} from "../../HOOK";
import PromiseNotification from "../../UI/PromiseNotification";
import FullUserInfo from "../../ENTITY/FullUserInfo";
import SettingsSwitchBlock from "../../ENTITY/SettingsSwitchBlock";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {DeleteAvatar} from "./Functions.tsx";

const BasicSettings: FC = () => {

	const {register,
		formState: {errors},
		handleSubmit,
		reset} = useForm<Inputs>({mode: "onSubmit"}),
		dispatch = useAppDispatch(),
		ToLocale = useLocaleDate(),
		userSelector = useAppSelector(state => state.user),
		[Theme, setTheme] = useState<string | null>(localStorage.getItem("theme"))

	if(userSelector.loadingInfo)
		return 	<div className={styles.BasicSettings}>
			<FullUserInfo
				lastSignIn="04.07.2023, 06:33:24"
				createdAt="04.07.2023, 06:33:24"
				signMethod="google.com"
				adminRights="наивысшие"
				email="tltxdmin@mail.gg"
				dopClass={styles.Loading}/>
		</div>


	const ChangeName = (data: Inputs) => {
		PromiseNotification({
			mainFunction: () => {
				if(!auth.currentUser) return Promise.reject(new Error('Пользователь не найден'))
				return updateDoc(doc(db, "Users", auth.currentUser.uid), {name: data.Name})
			},
			successFunction: () => {
				reset()
				return <b>Имя успешно изменено</b>
			}
		}).then(() => dispatch(changeUser(
			{userEmail: userSelector.userEmail, userDisplayName: data.Name, userPhoto: userSelector.userPhoto, tag: userSelector.tag, uid: userSelector.uid}
		)))
	}
	const changeTag = (data: Inputs) => {
		PromiseNotification({
			mainFunction: async () => {
				if(!auth.currentUser) return Promise.reject(new Error('Пользователь не найден'))

				const tagDocument = await getDocs(query(collection(db, "Users"), where("tag", "==", data.tag)))
				if(tagDocument.size) return Promise.reject(new Error('этот id уже занят'))

				return updateDoc(doc(db, "Users", auth.currentUser.uid), {tag: data.tag})

			},
			successFunction: () => {
				reset()
				return <b>ID успешно изменен</b>
			}
		}).then(() => dispatch(changeUser(
			{userEmail: userSelector.userEmail, userDisplayName: userSelector.userDisplayName, userPhoto: userSelector.userPhoto, tag: data.tag, uid: userSelector.uid}
		)))
	}

	const createdAt = auth.currentUser?.metadata.creationTime,
		lastSignIn = auth.currentUser?.metadata.lastSignInTime,
		providerID = auth.currentUser?.providerData[0].providerId,
		adminRights = userSelector.addNews ? 'наивысшие'
			: userSelector.addAdmin ? 'расширенные'
				: userSelector.ban ? 'базовые'
					: 'отсутствуют'

	if(createdAt && lastSignIn && providerID && userSelector.userEmail) return (
		<div className={styles.BasicSettings}>
			<FullUserInfo
				lastSignIn={ToLocale(lastSignIn)}
				createdAt={ToLocale(createdAt)}
				signMethod={providerID}
				adminRights={adminRights}
				email={userSelector.userEmail}
				isVerified={auth.currentUser?.emailVerified}/>
			<SettingsBlock
				SubmitFunction={ChangeName}
				handleSubmit={handleSubmit}
				register={register}
				options={{required: true, minLength: {value: 3, message: "Минимум 3 символа"}, maxLength: {value: 40, message: "Максимум 40 символов"}}}
				errors={errors.Name}
				label="Name"
				title="Изменить имя"
				type="text"/>
			<SettingsBlock
				SubmitFunction={changeTag}
				handleSubmit={handleSubmit}
				register={register}
				options={{
					required: true,
					minLength: {value: 5, message: "Минимум 5 символов"},
					maxLength: {value: 5, message: "Максимум 5 символов"},
					pattern: {value: /^[a-zA-Z0-9]+$/, message: "В id должны присутствовать только буквы и цифры"}
				}}
				errors={errors.tag}
				label="tag"
				title="Изменить id"
				type="text"/>
			<SettingsSwitchBlock action={() => {
				const condition = Theme === 'darkmode' ? 'lightmode' : 'darkmode'
				localStorage.setItem('theme', condition)
				setTheme(condition)
				document.documentElement.dataset.theme = condition
			}}
			title="Изменить тему"
			dopText={`Изменить тему на ${Theme === 'darkmode' ? 'светлую' : 'темную'}`}/>
			<SettingsSwitchBlock action={() => DeleteAvatar(userSelector, dispatch)}
			title="Удалить фото профиля"
			dopText="Вы уверены, что хотите удалить аватарку? Восстановить её будет невозможно"/>
		</div>
	)
}

export default BasicSettings
