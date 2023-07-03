import { FC } from 'react'
import styles from './Safety.module.sass'
import SettingsBlock from "../../ENTITY/SettingsChangeBlock";
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";
import {auth} from "../../firebaseInit.ts";
import {updateEmail, updatePassword} from "firebase/auth";
import PromiseNotification from "../../UI/PromiseNotification";
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";
import {changeUser} from "../../STORE/userSlice.ts";
import {useAppDispatch, useAppSelector} from "../../HOOK";


const Password: FC = () => {

	const {register,
		formState: {errors},
		handleSubmit,
		reset} = useForm<Inputs>({mode: "onSubmit"}),
		dispatch = useAppDispatch(),
		userSelector = useAppSelector(state => state.user)

	const ChangePassword = (data: Inputs) => {
		PromiseNotification({
			mainFunction: () => {
				if(!auth.currentUser) return Promise.reject(new Error)
				return updatePassword(auth.currentUser, data.Password)
			},
			successFunction: () => {
				reset()
				return <b>Пароль успешно изменен</b>
			}
		})
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
		}).then(() => dispatch(changeUser({userEmail: data.Email, userDisplayName: userSelector.userDisplayName, userPhoto: userSelector.userPhoto})))
	}

	const condition = auth.currentUser?.providerData[0].providerId === 'password'

	return (
		<div className={styles.safetyContent}>
			{condition
				? <SettingsBlock
				handleSubmit={handleSubmit}
				title="Изменить пароль"
				label="Password"
				options={{required: true, minLength: {value: 6, message: "Минимум 6 символов"}}}
				errors={errors.Password}
				register={register}
				type="text"
				SubmitFunction={ChangePassword}/>
			:	<SettingsDefaultBlock><p className={styles.cantChangeText}>Вы вошли с помощью {auth.currentUser?.providerData[0].providerId} и не можете изменить пароль</p></SettingsDefaultBlock>
			}
			{condition ? <SettingsBlock
					SubmitFunction={ChangeEmail}
					handleSubmit={handleSubmit}
					register={register}
					options={{required: true}}
					errors={errors.Email}
					label="Email"
					title="Изменить email"
					type="text"/>
				: <SettingsDefaultBlock><p className={styles.cantChangeText}>Вы вошли с помощью {auth.currentUser?.providerData[0].providerId} и не можете изменить email</p></SettingsDefaultBlock>}
		</div>
)
}

export default Password
