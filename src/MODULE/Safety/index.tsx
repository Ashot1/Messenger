import { FC } from 'react'
import styles from './Safety.module.sass'
import SettingsBlock from "../../ENTITY/SettingsChangeBlock";
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";
import {auth} from "../../firebaseInit.ts";
import {updateEmail} from "firebase/auth";
import PromiseNotification from "../../UI/PromiseNotification";
import {changeUser} from "../../STORE/userSlice.ts";
import {useAppDispatch, useAppSelector} from "../../HOOK";
import SettingsSwitchBlock from "../../ENTITY/SettingsSwitchBlock";
import {ChangePassword, SendVerifyMessage} from "./Functions.tsx";
import CheckProvider from "../../HOC/CheckProvider";


const Password: FC = () => {

	const {register,
		formState: {errors},
		handleSubmit,
		reset} = useForm<Inputs>({mode: "onSubmit"}),
		dispatch = useAppDispatch(),
		userSelector = useAppSelector(state => state.user)

	const ChangeEmail = (data: Inputs) => {
		PromiseNotification({
			successFunction: () => {
				reset()
				return <b>Email успешно изменен</b>
			},
			mainFunction: () => {
				if(!auth.currentUser) return Promise.reject(new Error('Пользователь не найден'))
				return updateEmail(auth.currentUser, data.Email)
			}
		}).then(() => dispatch(changeUser(
			{userEmail: data.Email, userDisplayName: userSelector.userDisplayName, userPhoto: userSelector.userPhoto, tag: userSelector.tag, uid: userSelector.uid}
		)))
	}

	const condition = auth.currentUser?.providerData[0].providerId === 'password'

	if(auth.currentUser) return (
		<div className={styles.safetyContent}>
			<CheckProvider providerID={auth.currentUser.providerData[0].providerId} condition={condition} dopText="не можете изменить пароль">
				<SettingsSwitchBlock action={ChangePassword}
									 title="Изменить пароль"
									 dopText="Вам отправиться письмо для изменения пароля на электронную почту"/>
			</CheckProvider>

			<CheckProvider providerID={auth.currentUser.providerData[0].providerId} condition={condition} dopText="не можете изменить email">
				<SettingsBlock
					SubmitFunction={ChangeEmail}
					handleSubmit={handleSubmit}
					register={register}
					options={{required: true}}
					errors={errors.Email}
					label="Email"
					title="Изменить email"
					type="text"/>
			</CheckProvider>

			<CheckProvider providerID={auth.currentUser.providerData[0].providerId} condition={condition} dopText="должны подтверждать email там">
				<SettingsSwitchBlock action={SendVerifyMessage}
									 title="Подтвердить email"
									 dopText="Вам отправиться письмо с подтверждением на электронную почту"/>
			</CheckProvider>

		</div>
)
}

export default Password
