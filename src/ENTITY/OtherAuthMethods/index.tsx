import styles from './OtherAuthMethods.module.sass'
import {FC, useState} from 'react'
import CustomButton from "../../UI/CustomButton";
import { signInWithPopup } from "firebase/auth";
import {auth, db, GoogleAuth} from "../../firebaseInit.ts";
import FormField from "../FormField";
import WaveButton from "../../UI/WaveButton";
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";
import {collection, doc, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";


const OtherAuthMethods: FC<{setTagState: () => void, TagState: boolean}> = ({setTagState, TagState}) => {
	const [Error, setError] = useState(""),
		{register,
			formState: {errors},
			handleSubmit} = useForm<Inputs>(),
		[UserUID, setUserUID] = useState('')

	const SetUserData = async (data: Inputs) => {

		const tagDocument = await getDocs(query(collection(db, "Users"), where("tag", "==", data.tag)))
		if(tagDocument.size) return setError("Этот id уже занят")

		if(!UserUID) return setError("Пользователь не найден")
		await setDoc(doc(db, "Users", UserUID),
			{
				name: auth.currentUser?.displayName,
				photo: auth.currentUser?.photoURL,
				tag: data.tag,
				addAdmin: false,
				addNews: false,
				canBanUsers: false,
				ban: false,
				posts: [],
				info: '',
				lastEntry: '',
				profileSettings: {
					canAddToFriends: true,
					canOtherMessage: true,
					canOtherSeePosts: true,
				}
			}
		)
		await setDoc(doc(db, "Lists", UserUID),
			{
				banList: [],
				friendList: [],
				acceptList: [],
			}
		)
		await setDoc(doc(db, "Notifications", UserUID),
			{
				notifications: []
			}
		)
			.then(() => window.location.reload())
	}

	const LoginWithPopup = () => {
		signInWithPopup(auth, GoogleAuth)
			.then(async response => {
				const Userdocument = await getDoc(doc(db, "Users", response.user.uid))
				if(Userdocument.data()) return

				setTagState()
				setUserUID(response.user.uid)
			})
			.catch(err => alert(err.message))
	}

	return (
		<>
			{TagState && <form onSubmit={handleSubmit(SetUserData)}>
				<FormField title="Придумайте уникальный id"
						   type="text"
						   register={register}
						   label="tag"
						   errors={errors.tag}
						   options={{
							   required: true,
							   minLength: {value: 5, message: "Минимум 5 символов"},
							   maxLength: {value: 5, message: "Максимум 5 символов"},
							   pattern: {
								   value: /^[a-zA-Z0-9]+$/,
								   message: "В id должны присутствовать только буквы и цифры"
							   }
						   }}
						   dopClass={styles.addTagInput}/>
				<div className={styles.ButtonPos}>
					<WaveButton dopClass={styles.ColorWhiteWithoutBorder}>Войти</WaveButton>
				</div>
				<p style={{color: 'red'}}>{Error}</p>
			</form>}
			{!TagState && <div className={styles.OtherMethods}>
				<CustomButton dopClass={styles.AuthMethod} onclick={LoginWithPopup}>G</CustomButton>
			</div>}
		</>

	)
}

export default OtherAuthMethods
