import styles from './NameChangeBlock.module.sass'
import {FC, useState} from 'react'
import FormField from "../FormField";
import WaveButton from "../../UI/WaveButton";
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";
import {useAppDispatch} from "../../HOOK";
import {auth} from "../../firebaseInit.ts";
import toast from "react-hot-toast";
import {updateProfile} from "firebase/auth";
import {changeUser} from "../../STORE/userSlice.ts";
import CustomButton from "../../UI/CustomButton";

const NameChangeBlock: FC = () => {

	const {register,
			reset,
			handleSubmit,
			formState: {errors}} = useForm<Inputs>({mode: 'onSubmit'}),
		dispatch = useAppDispatch(),
	 	[OpenState, setOpenState] = useState(false);

	const ChangeName = (data: Inputs) => {
		if(auth.currentUser)
			toast.promise(
				updateProfile(auth.currentUser, {
					displayName: data.Name
				}),
				{
					loading: 'Обновление...',
					success: () => {
						dispatch(changeUser({userEmail: auth.currentUser?.email, userDisplayName: data.Name, userPhoto: auth.currentUser?.photoURL}))
						reset()
						return <b>Имя успешно изменено</b>
					},
					error: e => <b>Ошибка: {e.message}</b>,
				},
				{style: {background: 'var(--primaryBGcolor)', color: 'var(--MainColor)'}, iconTheme: {primary: '#4487a2', secondary: '#fff'}}
			);

	}

	return (
		<>
			{OpenState && <form onSubmit={handleSubmit(ChangeName)} className={styles.ChangeNameForm}>
				<FormField title="Изменить имя" register={register} label="Name" options={{required: true}}
						   errors={errors.Name}/>
				<div className={styles.ButtonPosition}>
					<WaveButton color="#4487a2">Сохранить</WaveButton>
					<WaveButton color="var(--secondaryColor)" onclick={e => {
						e.preventDefault()
						setOpenState(false)
					}}>Закрыть</WaveButton>
				</div>
			</form>}
			{!OpenState && <CustomButton onclick={() => setOpenState(true)} dopClass={styles.OpenFormButton}>Изменить имя</CustomButton>}
		</>
	)
}

export default NameChangeBlock
