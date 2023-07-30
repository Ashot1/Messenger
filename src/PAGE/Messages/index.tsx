import styles from './Messages.module.sass'
import {FC, useEffect, useState} from 'react'
import MessagesList from "../../MODULE/MessagesList";
import {Outlet} from "react-router-dom";
import {useGetContactsQuery} from "../../STORE/firebaseApi.ts";
import {useAppSelector} from "../../HOOK";
import LoadingMessages from "./LoadingMessages.tsx"

const Messages: FC = () => {

	const [Users, setUsers] = useState<string[]>([]),
		{data, isLoading} = useGetContactsQuery({data: Users}, {skip: Users.length <= 0}),
		user = useAppSelector(state => state.user)

	useEffect(() => {
		const getUserList = () => {
			let list: string[] = [];
			user.messages.forEach(chat => {
				if(chat.type !== 'private') return
				if(chat.users.length > 1) {
					list.push(
						chat.users.filter(item => item !== user.uid)[0]
					);
				}
				else {
					list.push(chat.applicants[0])
				}
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