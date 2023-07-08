import styles from './ContactsList.module.sass'
import {FC} from 'react'
import UserList from "../../ENTITY/UserList";
import {useGetListsQuery} from "../../STORE/firebaseAPI2.ts";
import {useAppSelector} from "../../HOOK";
import {useGetContactsQuery} from "../../STORE/firebaseApi.ts";
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";

const ContactsList: FC = () => {
	const user = useAppSelector(state => state.user),
		{data, isLoading} = useGetListsQuery({id: user.uid}, {skip: user.uid === undefined}),
		{data: Contacts, isLoading: ContactsLoading} = useGetContactsQuery({data: data?.friends}, {skip: data === undefined}),
		fakeUsers = [
			{photo: "", name: "Загрузка", tag: "12341", uid: "123451423123"},
			{photo: "", name: "Загрузка", tag: "12342", uid: "123451423123"},
			{photo: "", name: "Загрузка", tag: "12343", uid: "123451423123"},
		]

	if(isLoading || ContactsLoading)
		return (
				<div className={styles.WrapperContactsList}>
					<UserList users={fakeUsers} isLoading={isLoading || ContactsLoading}/>
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
