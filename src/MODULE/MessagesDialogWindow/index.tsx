import styles from './MessagesDialogWindow.module.sass'
import {FC, useEffect, useState} from 'react'
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useAppSelector} from "../../HOOK";
import {UserFromList} from "../../ENTITY/UserList";
import {messageType} from "../../STORE/userSlice.ts";
import MessageHeader from "../../ENTITY/MessageHeader";
import MessageSendField from "../../ENTITY/MessageSendField";
import MessagesDialogList from "../../ENTITY/MessagesDialogList";

const MessagesDialogWindow: FC = () => {

	const {id} = useParams(),
		user = useAppSelector(state => state.user),
		[PageUser, setPageUser] = useState<UserFromList>(),
		[Messages, setMessages] = useState<messageType[]>([]),
		{data, loading} = useOutletContext<{ data: UserFromList[], loading: boolean }>(),
		navigate = useNavigate()

	useEffect(() => {
		if(!user) return
		const mes = user.messages.find((message) => message.type === 'private' && message.id === id)
		if(!mes && !user.loading) return navigate('/notfound')
		if(mes && user.uid) {
			if(!mes.users.includes(user.uid)) return navigate('/notfound')
			const userid = mes.users.filter(userMess => userMess !== user.uid)[0]
			setPageUser(data.find(user => user.uid === userid))
		}

	}, [data, user, id])

	useEffect(() => {
		const mes = user.messages.find((message) => message.type === 'private' && message.id === id)
		if(mes) setMessages(mes.message)
	}, [user, id])

	if(loading) return (
		<div className={styles.dialogWindowWrapper}>
			<MessageHeader PageUser={{photo: ' ', name: 'Загрузка', tag: "Загрузка", uid: "Загрузка"}} loading={loading}/>
			<MessagesDialogList messages={Messages} PageUser={{photo: ' ', name: 'Загрузка', tag: "Загрузка", uid: "Загрузка"}} loading={loading}/>
			<MessageSendField messagesPrev={Messages} id={'1'} CurrentUserID={'2'}/>
		</div>
	)

	if(PageUser && id && user.uid) return (
		<div className={styles.dialogWindowWrapper}>
			<MessageHeader PageUser={PageUser} loading={loading}/>
			<MessagesDialogList messages={Messages} PageUser={PageUser} loading={loading}/>
			<MessageSendField messagesPrev={Messages} id={id} CurrentUserID={user.uid}/>
		</div>
	)
}

export default MessagesDialogWindow
