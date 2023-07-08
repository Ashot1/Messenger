import {FC, useState} from 'react'
import FormField from "../../ENTITY/FormField";
import WaveButton from "../../UI/WaveButton";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {collection, doc, getDocs, query, setDoc, where} from "firebase/firestore";
import {auth, db} from "../../firebaseInit.ts";
import styles from "./RegisterForm.module.sass"
import {useForm} from "react-hook-form";
import {Inputs} from "../../UI/TransparentInput";

const RegisterForm: FC = () => {
	const [Error, setError] = useState(""),
		{
			register,
			handleSubmit,
			formState: {errors},
		} = useForm<Inputs>({mode: "onBlur"})

	const CreateUser = async (data: Inputs) => {
		const tagDocument = await getDocs(query(collection(db, "Users"), where("tag", "==", data.tag)))
		if(tagDocument.size) return setError("Этот id уже занят")
		createUserWithEmailAndPassword(auth, data.Email, data.Password)
			.then(async response => {
				await setDoc(doc(db, "Users", response.user.uid),
					{
						name: data.Name,
						photo: '',
						tag: data.tag,
						addAdmin: false,
						addNews: false,
						ban: false,
						posts: [],
						info: '',
						profileSettings: {
							canAddToFriends: true,
							canOtherMessage: true,
							canOtherSeePosts: true,
						}
					}
				)
				await setDoc(doc(db, "Lists", response.user.uid),
					{
						banList: [],
						friendList: [],
						acceptList: [],
					}
				)
				await setDoc(doc(db, "Notifications", response.user.uid),
					{
						notifications: []
					}
				)
			})
			.catch(e => setError(e.message))
	}

	return (
		<form autoComplete="on" className={styles.form} onSubmit={handleSubmit(CreateUser)}>
			<FormField title="Имя и фамилия"
					   register={register}
					   label="Name"
					   errors={errors.Name}
					   options={{required: true, minLength: {value: 3, message: "Минимум 3 символа"}, maxLength: {value: 40, message: "Максимум 40 символов"}}}
					   dopClass={styles.ColorWhite}/>
			<FormField title="Email" type="email" register={register} label="Email" errors={errors.Email} options={{required: true}} dopClass={styles.ColorWhite}/>
			<FormField title="Уникальный id"
					   type="text"
					   register={register}
					   label="tag"
					   errors={errors.tag}
					   options={{
						   required: true,
						   minLength: {value: 5, message: "Минимум 5 символов"},
						   maxLength: {value: 5, message: "Максимум 5 символов"},
						   pattern: {value: /^[a-zA-Z0-9]+$/, message: "В id должны присутствовать только буквы и цифры"}
					   }}
					   dopClass={styles.ColorWhite}/>
			<FormField title="Пароль"
					   type="password"
					   register={register}
					   label="Password"
					   errors={errors.Password}
					   options={{required: true, minLength: { value: 6, message: 'Минимум 6 символов'} }}
					   dopClass={styles.ColorWhite}/>
			<p style={{color: 'red'}}>{Error}</p>
			<div className={styles.ButtonPos}>
				<WaveButton dopClass={styles.ColorWhiteWithoutBorder}>Зарегистрироваться</WaveButton>
			</div>
		</form>
	)
}

export default RegisterForm
