import styles from './MessagesDialogList.module.sass'
import {FC, useEffect} from 'react'
import {IMessagesDialogList} from "./Types.ts";
import UserCircle from "../../UI/UserCircle";
import {useAppSelector} from "../../HOOK";
import userPNG from "../../ASSET/icon-avatar.png";

const MessagesDialogList: FC<IMessagesDialogList> = ({messages, PageUser, loading}) => {

	const currentUser = useAppSelector(state => state.user)

	if(loading) return <section className={styles.Messages}></section>

	useEffect(() => {
		const section = document.querySelector(`.${styles.Messages}`)
		if(section && messages) section.scrollTo({top: section.scrollHeight})
	}, [messages])

	return (
		<section className={styles.Messages}>
			<ul>
				{messages.map((mes, index) => {
					let url: string | undefined = PageUser.photo
					let cl = styles.messageTo
					if(mes.from === currentUser.uid){
						url = currentUser.userPhoto
						cl = styles.messageFrom
					}
					return <li key={index} className={cl}>
						<UserCircle url={url || userPNG} dopClass={styles.avatarDialog} style={{filter: url ? '' : 'var(--invertFilter)'}}/>
						<div className={styles.messageWrapper}>
							<p>
								{mes.text}
							</p>
							<span>{mes.date}</span>
						</div>
					</li>
				})}
			</ul>
		</section>
	)
}

export default MessagesDialogList
