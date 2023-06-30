import styles from './BasicSettings.module.sass'
import { FC } from 'react'
import SettingsBlock from "../../ENTITY/SettingsBlock";
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";
import {auth} from "../../firebaseInit.ts";
import {updateEmail, updateProfile} from "firebase/auth";
import {changeUser} from "../../STORE/userSlice.ts";
import {useAppDispatch, useLocaleDate} from "../../HOOK";
import PromiseNotification from "../../UI/PromiseNotification";
import FullUserInfo from "../../ENTITY/FullUserInfo";

const BasicSettings: FC = () => {

	const {register,
		formState: {errors},
		handleSubmit,
		reset} = useForm<Inputs>({mode: "onSubmit"}),
		dispatch = useAppDispatch(),
		ToLocale = useLocaleDate()


	const ChangeName = (data: Inputs) => {
		PromiseNotification({
			mainFunction: () => {
				if(!auth.currentUser) return Promise.reject(new Error)
				return updateProfile(auth.currentUser, {displayName: data.Name})
			},
			successFunction: () => {
				reset()
				return <b>Имя успешно изменено</b>
			}
		}).then(() => dispatch(changeUser({userEmail: auth.currentUser?.email, userDisplayName: data.Name, userPhoto: auth.currentUser?.photoURL})))

	}

	const ChangeEmail = (data: Inputs) => {
		PromiseNotification({
			successFunction: () => {
							reset()
							return <b>Email успешно изменен</b>
						},
			mainFunction: () => {
				if(!auth.currentUser) return Promise.reject(new Error)
				return updateEmail(auth.currentUser, data.Email)
			}
		}).then(() => dispatch(changeUser({userEmail: data.Email, userDisplayName: auth.currentUser?.displayName, userPhoto: auth.currentUser?.photoURL})))
	}

	const createdAt = auth.currentUser?.metadata.creationTime,
		lastSignIn = auth.currentUser?.metadata.lastSignInTime,
		providerID = auth.currentUser?.providerData[0].providerId

	if(createdAt && lastSignIn && providerID) return (
		<div className={styles.BasicSettings}>
			<FullUserInfo lastSignIn={ToLocale(lastSignIn)} createdAt={ToLocale(createdAt)} signMethod={providerID}/>
			<SettingsBlock
				SubmitFunction={ChangeName}
				handleSubmit={handleSubmit}
				register={register}
				options={{required: true}}
				errors={errors.Name}
				label="Name"
				title="Изменить имя"
				type="text"/>
			<SettingsBlock
				SubmitFunction={ChangeEmail}
				handleSubmit={handleSubmit}
				register={register}
				options={{required: true}}
				errors={errors.Email}
				label="Email"
				title="Изменить email"
				type="text"/>
		</div>
	)
}

export default BasicSettings
