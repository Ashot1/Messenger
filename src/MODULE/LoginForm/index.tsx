import {FC, useState} from 'react'
import FormField from "../../ENTITY/FormField";
import WaveButton from "../../UI/WaveButton";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebaseInit.ts";
import {useNavigate} from "react-router-dom";
import styles from "./LoginForm.module.sass"

const LoginForm: FC = () => {
	const [Params, setParams] = useState({email: "", password: ""}),
		[Error, setError] = useState(''),
		Navigate = useNavigate()

	const Login = async (e: MouseEvent) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, Params.email, Params.password)
			.then(() => Navigate('/'))
			.catch(err => setError(err.message.split("/")[1].slice(0, -2)))
	}

	return (
		<>
			<FormField title="Email" type="email"
					   setValue={e => setParams({email: e.target.value, password: Params.password})}
					   Value={Params.email}/>
			<FormField title="Пароль" type="password"
					   setValue={e => setParams({email:  Params.email, password: e.target.value})} Value={Params.password}/>
			<p style={{color: 'red'}}>{Error}</p>
			<div className={styles.ButtonPos}>
				<WaveButton onclick={Login}>Войти</WaveButton>
			</div>
		</>
	)
}

export default LoginForm
