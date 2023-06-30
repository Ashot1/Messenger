import { FC } from 'react'
import styles from './Safety.module.sass'
import SettingsBlock from "../../ENTITY/SettingsBlock";
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";
import {auth} from "../../firebaseInit.ts";
import {updatePassword} from "firebase/auth";
import PromiseNotification from "../../UI/PromiseNotification";


const Password: FC = () => {

	const {register,
		formState: {errors},
		handleSubmit,
		reset} = useForm<Inputs>({mode: "onSubmit"})

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
			:	<span className={styles.CantChangeInfo}>Вы вошли с помощью {auth.currentUser?.providerData[0].providerId} и не можете изменить пароль</span>
			}
		</div>
)
}

export default Password
