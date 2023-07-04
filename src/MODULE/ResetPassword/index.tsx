import styles from './ResetPassword.module.sass'
import { FC } from 'react'
import FormField from "../../ENTITY/FormField";
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";
import WaveButton from "../../UI/WaveButton";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import {auth} from "../../firebaseInit.ts";

const ResetPassword: FC = () => {

	const {register,
		handleSubmit,
		formState: {errors}} = useForm<Inputs>()

	const SendReset = (data: Inputs) => {
		toast.promise(
			sendPasswordResetEmail(auth, data.Email),
			{
				loading: 'Отправка...',
				success: () => {
					return <b>Сообщение с подтверждением отправлено на ваш email</b>
				},
				error: e => <b>Ошибка: {e.message}</b>,
			}
		)
	}

	return (
		<form className={styles.ResetForm} onSubmit={handleSubmit(SendReset)}>
			<FormField title="Введите email"
					   errors={errors.Email}
					   label="Email" register={register}
					   options={{required: true}}
					   type="email"
					   dopClass={styles.ColorWhite}/>
			<div className={styles.ResetBtnPosition}>
				<WaveButton dopClass={styles.ColorWhiteWithoutBorder}>Сбросить</WaveButton>
			</div>
		</form>
	)
}

export default ResetPassword
