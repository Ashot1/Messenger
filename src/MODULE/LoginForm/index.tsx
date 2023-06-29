import {FC, useState} from 'react'
import FormField from "../../ENTITY/FormField";
import WaveButton from "../../UI/WaveButton";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebaseInit.ts";
import {useNavigate} from "react-router-dom";
import styles from "./LoginForm.module.sass"
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";
import CustomButton from "../../UI/CustomButton";

const LoginForm: FC = () => {
	const [Error, setError] = useState(''),
		Navigate = useNavigate(),
		{ register, handleSubmit, formState: {errors} } = useForm<Inputs>()

	const Login = (data: Inputs) => {
		signInWithEmailAndPassword(auth, data.Email, data.Password)
			.then(() => Navigate('/'))
			.catch(err => setError(err.message.split("/")[1].slice(0, -2)))
	}

	return (
		<form autoComplete="on" className={styles.form} onSubmit={handleSubmit(Login)}>
			<FormField title="Email" type="email" register={register} label="Email" errors={errors.Email} options={{required: true}}/>
			<FormField title="Пароль" type="password" register={register} label="Password" errors={errors.Password} options={{required: true}}/>
			<CustomButton isLink url="/auth/reset" dopClass={styles.reset}>Сбросить пароль</CustomButton>
			<p style={{color: 'red'}}>{Error}</p>
			<div className={styles.ButtonPos}>
				<WaveButton>Войти</WaveButton>
			</div>
		</form>
	)
}

export default LoginForm
