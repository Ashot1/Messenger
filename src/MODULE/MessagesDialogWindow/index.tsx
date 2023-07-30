import styles from './MessagesDialogWindow.module.sass'
import {FC, useEffect, useState} from 'react'
import {useOutletContext, useParams} from "react-router-dom";
import {useAppSelector} from "../../HOOK";
import {UserFromList} from "../../ENTITY/UserList";
import MessageHeader from "../../ENTITY/MessageHeader";
import MessageSendField from "../../ENTITY/MessageSendField";
import MessagesDialogList from "../../ENTITY/MessagesDialogList";
import {PageUserType} from "../ProfileHeader";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import LoadingMessagesDialogWindow from "./LoadingMessagesDialogWindow.tsx";
import {messageList} from "../../STORE";

const MessagesDialogWindow: FC = () => {

	const {id} = useParams(),
		user = useAppSelector(state => state.user),
		[PageUser, setPageUser] = useState<UserFromList>(),
		[Messages, setMessages] = useState<messageList>(),
		{data, loading} = useOutletContext<{ data: UserFromList[], loading: boolean }>(),
		[PageUserLists, setPageUserLists]
			= useState<PageUserType>({banList: [], friends: [], acceptTo: []}),
		[LoadingLists, setLoadingLists] = useState(true)

	// loading pageUser information and last message
	useEffect(() => {
		if(!user) return
		const mes = user.messages.find((message) => message.type === 'private' && message.id === id)
		if(!mes && !user.loading.loadingMessages || !mes || !data) return
		if(user.uid) {
			if(!mes.users.includes(user.uid)) return
			const userid = mes.users.filter(userMess => userMess !== user.uid)[0]
			if(userid && userid.length > 0){
				setPageUser(data.find(user => user.uid === userid))
			}
			else {
				const useridElse = mes.applicants[0]
				setPageUser(data.find(user => user.uid === useridElse))
			}
		}
		setMessages(mes)
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


	if(loading && LoadingLists) return <LoadingMessagesDialogWindow/>

	if(PageUser && id && user.uid && PageUserLists.banList && Messages) return (
		<div className={styles.dialogWindowWrapper}>
			<MessageHeader PageUser={PageUser} loading={loading} messageList={Messages} pageID={id}/>
			<MessagesDialogList messages={Messages.message} PageUser={PageUser} loading={loading} pageID={id}/>
			{!PageUserLists.banList.includes(user.uid)
				? <MessageSendField messagesPrev={Messages.message} id={id} CurrentUserID={user.uid}/>
				: <p className={styles.BlockText}>Пользователь заблокировал вас</p>
			}
		</div>
	)
}

export default MessagesDialogWindow
export {LoadingMessagesDialogWindow}