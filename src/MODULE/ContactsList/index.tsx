import styles from './ContactsList.module.sass'
import {FC} from 'react'
import UserList from "../../ENTITY/UserList";
import {useAppSelector} from "../../HOOK";
import {useGetContactsQuery} from "../../STORE/firebaseApi.ts";
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";

const ContactsList: FC = () => {
	const user = useAppSelector(state => state.user),
		{data: Contacts, isLoading: ContactsLoading} = useGetContactsQuery({data: user.friendList}),
		fakeUsers = [
			{photo: "", name: "Загрузка", tag: "12341", uid: "123451423123"},
			{photo: "", name: "Загрузка", tag: "12342", uid: "123451423123"},
			{photo: "", name: "Загрузка", tag: "12343", uid: "123451423123"},
		],
		loading = ContactsLoading || user.loading.loadingLists

	if(loading)
		return (
				<div className={styles.WrapperContactsList}>
					<UserList users={fakeUsers} isLoading={loading}/>
				</div>
			)

	if(!Contacts?.length)
		return (
			<div style={{display: 'grid', placeItems: 'center', width: '100%'}}>
				<SettingsDefaultBlock dopClass={styles.Center}>
					Список пуст
				</SettingsDefaultBlock>
			</div>
		)


	return (
		<div className={styles.WrapperContactsList}>
			<UserList users={Contacts}/>
		</div>
	)
}

export default ContactsList
