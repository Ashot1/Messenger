import {FC, useState} from 'react'
import FormField from "../../ENTITY/FormField";
import WaveButton from "../../UI/WaveButton";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../../firebaseInit.ts";
import {useNavigate} from "react-router-dom";
import styles from "./RegisterForm.module.sass"
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";

const RegisterForm: FC = () => {
	const [Error, setError] = useState(""),
		Navigate = useNavigate(),
		{
			register,
			handleSubmit,
			formState: {errors},
		} = useForm<Inputs>({mode: "onBlur"})

	const CreateUser = (data: Inputs) => {
		createUserWithEmailAndPassword(auth, data.Email, data.Password)
			.then(response => {
				updateProfile(response.user, {
					displayName: data.Name
				}).then(() => {
					Navigate('/')
					window.location.reload()
				}).catch(e => setError(e.message))
			})
			.catch(e => setError(e.message.split('/')[1].slice(0, -2)))
	}

	return (
		<form autoComplete="on" className={styles.form} onSubmit={handleSubmit(CreateUser)}>
			<FormField title="Имя и фамилия" register={register} label="Name" errors={errors.Name} options={{required: true}}/>
			<FormField title="Email" type="email" register={register} label="Email" errors={errors.Email} options={{required: true}}/>
			<FormField title="Пароль"
					   type="password"
					   register={register}
					   label="Password"
					   errors={errors.Password}
					   options={{required: true, minLength: { value: 6, message: 'Минимум 6 символов'} }}/>
			<p style={{color: 'red'}}>{Error}</p>
			<div className={styles.ButtonPos}>
				<WaveButton>Зарегистрироваться</WaveButton>
			</div>
		</form>
	)
}

export default RegisterForm
