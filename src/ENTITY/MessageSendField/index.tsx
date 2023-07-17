import styles from './MessageSendField.module.sass'
import {FC, useRef} from 'react'
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import {useLocaleDate} from "../../HOOK";
import {IMessageSendField} from "./Types.ts";

const MessageSendField: FC<IMessageSendField> = ({messagesPrev, id, CurrentUserID}) => {
	const sectionref = useRef(null),
		getDate = useLocaleDate()

	const sendMessage = async (e: any) => {
		e.preventDefault();
		try{
			const date = new Date
			const relativeDate = getDate(date.toString())

			await updateDoc(doc(db, "Messages", id), {
				message: [...messagesPrev, {
					date: relativeDate,
					isChecked: false,
					text: e.target[0].value,
					from: CurrentUserID,
					}
				]
			})
		} catch (err) {
			console.log((err as Error).message)
		}
	}

	return (
		<form className={styles.sendMessage} ref={sectionref} onSubmit={sendMessage}>
			<textarea onInput={(e) => {
				if(sectionref.current) (sectionref.current as HTMLDivElement).style.height = (e.target as HTMLTextAreaElement).scrollHeight + 'px'
			}} required></textarea>
			<div className={styles.SendButtonPos}>
				<button className={styles.sendButton}>
					▲
				</button>
			</div>
		</form>
	)
}

export default MessageSendField
