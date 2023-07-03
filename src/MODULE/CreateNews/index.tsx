import styles from './CreateNews.module.sass'
import {ChangeEvent, FC, useState} from 'react'
import CustomButton from "../../UI/CustomButton";
import {useAppSelector, useLocaleDate} from "../../HOOK";
import TransparentBlock from "../../UI/TransparentBlock";
import TransparentInput from "../../UI/TransparentInput";
import BorderedButton from "../../UI/BorderedButton";
import {newsType} from "../../STORE";
import { collection, addDoc } from "firebase/firestore";
import PromiseNotification from "../../UI/PromiseNotification";
import {db} from "../../firebaseInit.ts";

const CreateNews: FC = () => {
	const user = useAppSelector(state => state.user),
		[OpenState, setOpenState] = useState(false),
		[InputsValues, setInputsValues] = useState<{[key: string]: string}>({}),
		[InputsCount, setInputsCount] = useState(1),
		getDate = useLocaleDate()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
		setInputsValues(prevState =>
			({...prevState, [e.target.name]: e.target.value}))
	}

	const sendNews = () => {
		if(!InputsValues.title || !InputsValues.Update1) return
		const date = new Date
		const relativeDate = getDate(date.toString()).split(',')[0]
		let News: newsType = {
			createAt: relativeDate,
			title: InputsValues.title,
			content: []
		}
		Object.values(InputsValues).forEach(item => {
			if(InputsValues.title === item) return
			News.content.push(item)
		})
		return PromiseNotification({
			mainFunction: () => addDoc(collection(db, "News"), News),
			successFunction: () => <p>Новость добавлена</p>
		})
	}

	const Inputs = () => {
		const fields = []
		for(let i = 1; i <= InputsCount; i++) {
			fields.push(<TransparentInput key={i} setValue={handleChange}
									name={`Update${i}`}
									dopClass={styles.Input} placeholder={`Обновление ${i}`}/>)
		}
		return fields
	}

	const changeInputCount = () => {
		if(InputsCount <= 1) return
		setInputsValues(prevState => {
			let state = prevState
			delete state[`Update${InputsCount}`]
			return state
		})
		// setInputsValues(prevState => )
		setInputsCount(prev => prev - 1)
	}

	return (
		<>
			{user.addNews && !OpenState &&
				<div className={styles.CreateNewsButtonPosition}>
					<CustomButton dopClass={styles.createButton}
					onclick={() => setOpenState(true)}>+</CustomButton>
				</div>}
			{OpenState && <TransparentBlock dopClass={styles.CreateBlock}>
				<TransparentInput setValue={handleChange}
								  name="title"
								  dopClass={styles.Input}
								  placeholder="Название"/>
				{Inputs()}
				<div className={styles.CreateNewFieldButtonPosition}>
					<CustomButton dopClass={styles.CreateNewFieldButton}
								  onclick={() => setInputsCount(prev => prev + 1)}>+</CustomButton>
					<CustomButton dopClass={styles.DeleteNewFieldButton}
								  onclick={changeInputCount}>-</CustomButton>
				</div>
				<div className={styles.CreateNewFieldButtonPosition}>
					<BorderedButton click={sendNews}>Отправить</BorderedButton>
					<BorderedButton click={() => setOpenState(false)}>Закрыть</BorderedButton>
				</div>
			</TransparentBlock>}
		</>
	)
}

export default CreateNews
