import styles from './Messages.module.sass'
import {FC, useEffect, useState} from 'react'
import MessagesList from "../../MODULE/MessagesList";
import {Outlet} from "react-router-dom";
import {useGetContactsQuery} from "../../STORE/firebaseApi.ts";
import {useAppSelector} from "../../HOOK";
import LoadingMessages from "./LoadingMessages.tsx"

const Messages: FC = () => {

	const [Users, setUsers] = useState<string[]>([]),
		{data, isLoading} = useGetContactsQuery({data: Users}, {skip: !Users}),
		user = useAppSelector(state => state.user)

	useEffect(() => {
		const getUserList = () => {
			let list: string[] = [];
			user.messages.forEach(chat => {
				list.push(chat.users.filter(item => item !== user.uid)[0]);
			});
			setUsers(list);
		}

		getUserList();
	}, [user.messages]);

	return (
		<div className={styles.messages}>
			<div className={styles.content}>
				<MessagesList data={data} loading={isLoading || user.loading.loadingMessages}/>
				<Outlet context={{data: data, loading: isLoading || user.loading.loadingMessages}}/>
			</div>
		</div>
	)
}

export default Messages
export {LoadingMessages}