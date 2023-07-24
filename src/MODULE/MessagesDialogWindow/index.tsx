import styles from './MessagesDialogWindow.module.sass'
import {FC, useEffect, useState} from 'react'
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useAppSelector} from "../../HOOK";
import {UserFromList} from "../../ENTITY/UserList";
import {messageType} from "../../STORE/userSlice.ts";
import MessageHeader from "../../ENTITY/MessageHeader";
import MessageSendField from "../../ENTITY/MessageSendField";
import MessagesDialogList from "../../ENTITY/MessagesDialogList";
import {PageUserType} from "../ProfileHeader";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";

const MessagesDialogWindow: FC = () => {

	const {id} = useParams(),
		user = useAppSelector(state => state.user),
		[PageUser, setPageUser] = useState<UserFromList>(),
		[Messages, setMessages] = useState<messageType[]>([]),
		{data, loading} = useOutletContext<{ data: UserFromList[], loading: boolean }>(),
		navigate = useNavigate(),
		[PageUserLists, setPageUserLists]
			= useState<PageUserType>({banList: [], friends: [], acceptTo: []}),
		[LoadingLists, setLoadingLists] = useState(true)

	// loading pageUser information and last message
	useEffect(() => {
		if(!user) return
		const mes = user.messages.find((message) => message.type === 'private' && message.id === id)
		if(!mes && !user.loading || !mes) return navigate('/notfound')
		if(user.uid) {
			if(!mes.users.includes(user.uid)) return navigate('/notfound')
			const userid = mes.users.filter(userMess => userMess !== user.uid)[0]
			setPageUser(data.find(user => user.uid === userid))
		}

		setMessages(mes.message)
	}, [data, user, id])

	useEffect(() => {
		if(!PageUser?.uid) return
		getDoc(doc(db, "Lists", PageUser.uid))
			.then(response => setPageUserLists({
				acceptTo: response.data()?.acceptList,
				friends: response.data()?.friendList,
				banList: response.data()?.banList
			}))
		setLoadingLists(false)
	}, [PageUser])



	if(loading && LoadingLists) return (
		<div className={styles.dialogWindowWrapper}>
			<MessageHeader PageUser={{photo: ' ', name: 'Загрузка', tag: "Загрузка", uid: "Загрузка"}} loading={true}/>
			<MessagesDialogList messages={Messages} PageUser={{photo: ' ', name: 'Загрузка', tag: "Загрузка", uid: "Загрузка"}} loading={true} pageID="1234"/>
			<MessageSendField messagesPrev={Messages} id={'1'} CurrentUserID={'2'}/>
		</div>
	)

	if(PageUser && id && user.uid && PageUserLists.banList) return (
		<div className={styles.dialogWindowWrapper}>
			<MessageHeader PageUser={PageUser} loading={loading}/>
			<MessagesDialogList messages={Messages} PageUser={PageUser} loading={loading} pageID={id}/>
			{!PageUserLists.banList.includes(user.uid)
				? <MessageSendField messagesPrev={Messages} id={id} CurrentUserID={user.uid}/>
				: <p className={styles.BlockText}>Пользователь заблокировал вас</p>
			}
		</div>
	)
}

export default MessagesDialogWindow
