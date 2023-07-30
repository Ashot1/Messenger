import styles from './MessagesDialogList.module.sass'
import {FC, useEffect} from 'react'
import {IMessagesDialogList} from "./Types.ts";
import UserCircle from "../../UI/UserCircle";
import {useAppSelector} from "../../HOOK";
import userPNG from "../../ASSET/icon-avatar.png";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";

const MessagesDialogList: FC<IMessagesDialogList> = ({messages, PageUser, loading, pageID}) => {

	const currentUser = useAppSelector(state => state.user)

	if(loading) return <section className={styles.Messages}></section>

	useEffect(() => {
		const section = document.querySelector(`.${styles.Messages}`)
		if(!section || !messages) return

		section.scrollTo({top: section.scrollHeight})

		const CheckMarkMessage = async () => {

			const lastMessageTo = messages.findLast(elem => elem.from !== currentUser.uid)

			if(!lastMessageTo || lastMessageTo.isChecked) return

			const firstNoChecked = messages.findIndex(item => !item.isChecked)

			if(firstNoChecked === -1) return

			//@ts-ignore
			let NewMessages = messages.toSpliced(firstNoChecked)

			for(let i = firstNoChecked; i < messages.length; i++){
				if(messages[i].from !== currentUser.uid) NewMessages.push({...messages[i], isChecked: true})
				else NewMessages.push(messages[i])
			}
			updateDoc(doc(db, "Messages", pageID), {
				message: NewMessages
			})
				.catch(e => console.log(e.message))
		}

		CheckMarkMessage()

	}, [messages])

	return (
		<section className={styles.Messages}>
			<ul>
				{messages.map((mes, index) => {
					let url: string | undefined = PageUser.photo
					let cl = styles.messageTo
					let MarkColor = 'var(--secondaryTextColor)'

					if(mes.from === currentUser.uid){
						url = currentUser.userPhoto
						cl = styles.messageFrom
						MarkColor = '#fff'
					}

					if(mes.from === 'system') return (
						<li key={index} className={styles.SystemText}>
							{mes.text}
						</li>
					)

					return <li key={index} className={cl}>
						<UserCircle url={url || userPNG} dopClass={styles.avatarDialog} style={{filter: url ? '' : 'var(--invertFilter)'}} isButton={false}/>
						<div className={styles.messageWrapper}>
							<div className={styles.MessageTextWrap}>
								<p>{mes.text}</p>
								<span className={styles.CheckedState}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
										<path d="M416 128L192 384 96 288"/>
									</svg>
									<svg xmlns="http://www.w3.org/2000/svg"
										 viewBox="0 0 412 512"
										 className={styles.SecondCheckMark}
										 style={{stroke: mes.isChecked ? MarkColor : 'transparent'}}>
										<path d="M416 128L192 384 96 277"/>
									</svg>
								</span>
							</div>
							<div className={styles.MessageDate}>{mes.date}</div>
						</div>
					</li>
				})}
			</ul>
		</section>
	)
}

export default MessagesDialogList
