import styles from './MessageHeader.module.sass'
import {FC, useState} from 'react'
import CustomButton from "../../UI/CustomButton";
import UserData from "../../UI/UserData";
import CrossButton from "../../UI/CrossButton";
import {IMessageHeader} from "./Types.ts";
import DropDownMenu from "../../UI/DropDownMenu";
import {Link, useNavigate} from "react-router-dom";
import ModalWindow from "../../UI/ModalWindow";
import {useAppSelector, useLocaleDate} from "../../HOOK";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import CustomNotification from "../../UI/CustomNotification";

const MessageHeader: FC<IMessageHeader> = ({PageUser, loading, messageList, pageID}) => {

	const [ModalOpen, setModalOpen] = useState(false),
		CurrentUser = useAppSelector(state => state.user),
		navigate = useNavigate(),
		getDate = useLocaleDate()

	if(loading) return (
		<nav className={styles.Head}>
			<CustomButton dopClass={styles.dataWrapper}>
				<UserData
					name="Загрузка"
					photo="Загрузка"
					secondaryText="Загрузка"
					logoDopClass={styles.LogoDialog}
					TextDopClass={styles.TextDialog}
					loading={loading}
					isButton={false}/>
			</CustomButton>
			<span className={styles.CloseButtonPos}>
					<CrossButton isLink url="/messages"/>
				</span>
		</nav>
	)

	const DropMenu = <>
		<li><Link to={`/profile/${PageUser.uid}`}>Профиль</Link></li>
		<li className={styles.DeleteDialogButton} onClick={() => setModalOpen(true)}>Удалить диалог</li>
	</>

	const SuccessDelete = () => {
		setModalOpen(false)
		navigate('/messages')
		CustomNotification('Диалог успешно удален')
	}

	const deleteDialog = () => {
		if(!CurrentUser.uid) return
		const usersWithoutCurrent = messageList.users.filter(id => id !== CurrentUser.uid)
		if(usersWithoutCurrent.length > 0) {
			const date = new Date
			const relativeDate = getDate(date.toString())
			updateDoc(doc(db, 'Messages', pageID), {
				message: messageList.message.concat({
					from: 'system',
					date: relativeDate,
					text: `${CurrentUser.userDisplayName} удалил диалог`,
					isChecked: false,
				}),
				members: usersWithoutCurrent,
				applicants: messageList.applicants.concat(CurrentUser.uid)
			})
				.then(SuccessDelete)
		} else {
			deleteDoc(doc(db, 'Messages', pageID))
				.then(SuccessDelete)
		}

	}

	return (
		<nav className={styles.Head}>
			<DropDownMenu list={DropMenu} dopClassWrapper={styles.dataWrapper} needArrow={false} dopClassList={styles.dataList}>
				<UserData
					name={PageUser.name}
					photo={PageUser.photo}
					secondaryText={PageUser.tag}
					logoDopClass={styles.LogoDialog}
					TextDopClass={styles.TextDialog}
					isButton={false}/>
			</DropDownMenu>
			<span className={styles.CloseButtonPos}>
					<CrossButton isLink url="/messages"/>
			</span>

			<ModalWindow width={70} bgClick={() => setModalOpen(false)} openState={ModalOpen}>
				<h2 className={styles.ModalText}>Вы уверены, что хотите удалить диалог?</h2>
				<p className={styles.DopInfo}>Восстановить его можно, только если он сохранился у вашего собеседника</p>
				<div className={styles.ModalButtons}>
					<CustomButton onclick={deleteDialog} dopClass={styles.Quit}>Удалить</CustomButton>
					<CustomButton onclick={() => setModalOpen(false)} dopClass={styles.Close}>Отмена</CustomButton>
				</div>
			</ModalWindow>

		</nav>
	)
}

export default MessageHeader
