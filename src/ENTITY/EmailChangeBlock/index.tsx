import styles from './EmailChangeBlock.module.sass'
import {FC, useState} from 'react'
import FormField from "../FormField";
import WaveButton from "../../UI/WaveButton";
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";
import {useAppDispatch} from "../../HOOK";
import {auth} from "../../firebaseInit.ts";
import toast from "react-hot-toast";
import {changeUser} from "../../STORE/userSlice.ts";
import CustomButton from "../../UI/CustomButton";
import {updateEmail} from "firebase/auth";

const EmailChangeBlock: FC = () => {

	const {register,
			reset,
			handleSubmit,
			formState: {errors}} = useForm<Inputs>({mode: 'onSubmit'}),
			[OpenState, setOpenState] = useState(false),
			dispatch = useAppDispatch()

	const ChangeEmail = (data: Inputs) => {
		if(auth.currentUser)
		toast.promise(
			updateEmail(auth.currentUser, data.Email),
			{
				loading: 'Обновление...',
				success: () => {
					dispatch(changeUser({userEmail: data.Email, userDisplayName: auth.currentUser?.displayName, userPhoto: auth.currentUser?.photoURL}))
					reset()
					return <b>Email успешно изменен</b>
				},
				error: (e: any) => <b>Ошибка: {
					e.message === 'Firebase: Error (auth/requires-recent-login).'
						? 'Чтобы изменить пароль необходимо перезайти на аккаунт'
						: e.message
				}</b>,
			},
			{style: {background: 'var(--primaryBGcolor)', color: 'var(--MainColor)'}, iconTheme: {primary: '#4487a2', secondary: '#fff'}}
		);
	}

	return (
		<>
			{OpenState && <form onSubmit={handleSubmit(ChangeEmail)} className={styles.ChangeEmailForm}>
				<FormField title="Изменить email" register={register} label="Email" options={{required: true}}
						   errors={errors.Email} type="email"/>
				<div className={styles.ButtonPosition}>
					<WaveButton color="#4487a2">Сохранить</WaveButton>
					<WaveButton color="var(--secondaryColor)" onclick={e => {
						e.preventDefault()
						setOpenState(false)
					}}>Закрыть</WaveButton>
				</div>
			</form>}
			{!OpenState && <CustomButton onclick={() => setOpenState(true)} dopClass={styles.OpenFormButton}>Изменить email</CustomButton>}
		</>
	)
}

export default EmailChangeBlock

