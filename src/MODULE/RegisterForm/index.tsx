import {FC, useState} from 'react'
import FormField from "../../ENTITY/FormField";
import WaveButton from "../../UI/WaveButton";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../../firebaseInit.ts";
import {useNavigate} from "react-router-dom";
import styles from "./RegisterForm.module.sass"

const RegisterForm: FC = () => {
	const [Info, setInfo] = useState({FirstName: "", email: "", password: ""}),
	 	[Error, setError] = useState(""),
		Navigate = useNavigate()

	const CreateUser = (e: MouseEvent) => {
		e.preventDefault()
		if(!Info.FirstName || !Info.email || !Info.password) return setError("Не все данные введены")
		createUserWithEmailAndPassword(auth, Info.email, Info.password)
			.then(response => {
				updateProfile(response.user, {
					displayName: Info.FirstName
				}).catch(e => setError(e.message))
				Navigate('/')
			})
			.catch(e => setError(e.message.split('/')[1].slice(0, -2)))
	}

	return (
		<>
			<FormField title="Имя и фамилия" Value={Info.FirstName} required
					   setValue={(e) => setInfo({FirstName: e.target.value, email: Info.email, password: Info.password})}/>
			<FormField title="Email" type="email" Value={Info.email} required
					   setValue={(e) => setInfo({FirstName: Info.FirstName, email: e.target.value, password: Info.password})}/>
			<FormField title="Пароль" type="password" Value={Info.password} required
					   setValue={(e) => setInfo({FirstName: Info.FirstName, email: Info.email, password: e.target.value})}/>
			<p style={{color: 'red'}}>{Error}</p>
			<div className={styles.ButtonPos}>
				<WaveButton onclick={CreateUser}>Зарегистрироваться</WaveButton>
			</div>
		</>
	)
}

export default RegisterForm
