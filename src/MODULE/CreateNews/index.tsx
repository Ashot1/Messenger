import styles from './CreateNews.module.sass'
import {ChangeEvent, FC, useState} from 'react'
import CustomButton from "../../UI/CustomButton";
import {useAppSelector, useLocaleDate} from "../../HOOK";
import TransparentBlock from "../../UI/TransparentBlock";
import TransparentInput from "../../UI/TransparentInput";
import BorderedButton from "../../UI/BorderedButton";
import PromiseNotification from "../../UI/PromiseNotification";
import {useAddNewsMutation} from "../../STORE/newsAPI.ts";
import CreateButton from "../../UI/CreateButton";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import {useCreateNotificationMutation} from "../../STORE/firebaseApi.ts";

const CreateNews: FC = () => {
	const user = useAppSelector(state => state.user),
		[OpenState, setOpenState] = useState(false),
		[InputsValues, setInputsValues] = useState<{[key: string]: string}>({}),
		[InputsCount, setInputsCount] = useState(1),
		getDate = useLocaleDate(),
		[addNews] = useAddNewsMutation(),
		[createNotifServer] = useCreateNotificationMutation()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
		setInputsValues(prevState =>
			({...prevState, [e.target.name]: e.target.value}))
	}

	const sendNews = () => {
		if(!InputsValues.title || !InputsValues.Update1) return

		const date = new Date
		const relativeDate = getDate(date.toString())

		let content: {stringValue: string}[] = []

		Object.values(InputsValues).forEach(item => {
			if(InputsValues.title === item) return
			content.push({stringValue: item})
		})

		return PromiseNotification({
			mainFunction: async () => await addNews({title: InputsValues.title, createAt: relativeDate.split(',')[0], content: content}),
			successFunction: () => <b>Новость добавлена</b>
		})
			.then(async () => {
				return PromiseNotification({
					mainFunction: async () => {
						const result = await getDocs(query(collection(db, "Notifications")))
						return result.docs.map(async (item) => (
							createNotifServer({
								toId: item.id,
								getDate: getDate,
								text: `Вышло ${InputsValues.title.toLowerCase()}`,
								fromPhoto: 'newsIcon',
								url: '/news'
							})
						))
					},
					successFunction: () => <b>Уведомления отправлены</b>
				})
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
		setInputsCount(prev => prev - 1)
	}

	return (
		<>
			{user.addNews && !OpenState &&
				<div className={styles.CreateNewsButtonPosition}>
					<CreateButton Click={() => setOpenState(true)}/>
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
