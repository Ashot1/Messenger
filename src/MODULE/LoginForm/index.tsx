import {FC, useState} from 'react'
import FormField from "../../ENTITY/FormField";
import WaveButton from "../../UI/WaveButton/WaveButton.tsx";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebaseInit.ts";
import {useNavigate} from "react-router-dom";

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
			<WaveButton onclick={Login}>Войти</WaveButton>
		</>
	)
}

export default LoginForm
