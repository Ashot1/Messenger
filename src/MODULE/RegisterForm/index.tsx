import {FC, useState} from 'react'
import FormField from "../../ENTITY/FormField";
import WaveButton from "../../UI/WaveButton/WaveButton.tsx";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../../firebaseInit.ts";
import {useNavigate} from "react-router-dom";

const RegisterForm: FC = () => {
	const [Info, setInfo] = useState({FirstName: "", LastName: "", email: "", password: ""}),
	 	[Error, setError] = useState(""),
		Navigate = useNavigate()

	const CreateUser = (e: MouseEvent) => {
		e.preventDefault()
		if(!Info.FirstName || !Info.LastName || !Info.email || !Info.password) return setError("Не все данные введены")
		createUserWithEmailAndPassword(auth, Info.email, Info.password)
			.then(response => {
				updateProfile(response.user, {
					displayName: `${Info.FirstName} ${Info.LastName}`
				}).catch(e => setError(e.message))
			})
			.catch(e => setError(e.message))
			.finally(() => Navigate('/'))
	}

	return (
		<>
			<FormField title="Имя" Value={Info.FirstName} required
					   setValue={(e) => setInfo({FirstName: e.target.value, LastName: Info.LastName, email: Info.email, password: Info.password})}/>
			<FormField title="Фамилия" Value={Info.LastName} required
					   setValue={(e) => setInfo({FirstName: Info.FirstName, LastName: e.target.value, email: Info.email, password: Info.password})}/>
			<FormField title="Email" type="email" Value={Info.email} required
					   setValue={(e) => setInfo({FirstName: Info.FirstName, LastName: Info.LastName, email: e.target.value, password: Info.password})}/>
			<FormField title="Пароль" type="password" Value={Info.password} required
					   setValue={(e) => setInfo({FirstName: Info.FirstName, LastName: Info.LastName, email: Info.email, password: e.target.value})}/>
			<p style={{color: 'red'}}>{Error}</p>
			<WaveButton onclick={CreateUser}>Зарегистрироваться</WaveButton>
		</>
	)
}

export default RegisterForm
