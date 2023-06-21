import styles from './OtherAuthMethods.module.sass'
import { FC } from 'react'
import CustomButton from "../../UI/CustomButton";
import { signInWithPopup } from "firebase/auth";
import {auth, GoogleAuth} from "../../firebaseInit.ts";
import {useNavigate} from "react-router-dom";


const OtherAuthMethods: FC = () => {

	const navigate = useNavigate()

	const LoginWithPopup = () => {
		signInWithPopup(auth, GoogleAuth)
			.then(() => navigate('/'))
			.catch(err => alert(err.message))
	}

	return (
		<div className={styles.OtherMethods}>
			<CustomButton dopClass={styles.AuthMethod} onclick={LoginWithPopup}>G</CustomButton>
		</div>
	)
}

export default OtherAuthMethods
