import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";
import toast from "react-hot-toast";
import {updatePassword} from "firebase/auth";
import {auth} from "../../firebaseInit.ts";
import FormField from "../FormField";
import WaveButton from "../../UI/WaveButton";
import CustomButton from "../../UI/CustomButton";
import styles from './PasswordChangeBlock.module.sass'


const PasswordChangeBlock: FC = () => {

	const {register,
			reset,
			handleSubmit,
			formState: {errors}} = useForm<Inputs>({mode: 'onSubmit'}),
		[OpenState, setOpenState] = useState(false);

	const ChangePassword = (data: Inputs) => {
		if(auth.currentUser)
			toast.promise(
				updatePassword(auth.currentUser, data.Password),
				{
					loading: 'Обновление...',
					success: () => {
						reset()
						return <b>Пароль успешно изменен</b>
					},
					error: e => <b>Ошибка: {
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
			{OpenState && <form onSubmit={handleSubmit(ChangePassword)} className={styles.ChangePasswordForm}>
				<FormField title="Изменить пароль" register={register} label="Password" options={{required: true}}
						   errors={errors.Password}/>
				<div className={styles.ButtonPosition}>
					<WaveButton color="#4487a2">Сохранить</WaveButton>
					<WaveButton color="var(--secondaryColor)" onclick={e => {
						e.preventDefault()
						setOpenState(false)
					}}>Закрыть</WaveButton>
				</div>
			</form>}
			{!OpenState && <CustomButton onclick={() => setOpenState(true)} dopClass={styles.OpenFormButton}>Изменить пароль</CustomButton>}
		</>
	)
}

export default PasswordChangeBlock
