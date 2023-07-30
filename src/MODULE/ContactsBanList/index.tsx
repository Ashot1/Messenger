import styles from './ContactsBanList.module.sass'
import { FC } from 'react'
import {useAppSelector} from "../../HOOK";
import {useGetContactsQuery} from "../../STORE/firebaseApi.ts";
import UserList from "../../ENTITY/UserList";
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";

const ContactsBanList: FC = () => {

	const user = useAppSelector(state => state.user),
		{data: BanList, isLoading: ContactsLoading} = useGetContactsQuery({data: user.banList}),
		loading = ContactsLoading || user.loading.loadingLists,
		fakeUsers = [
			{photo: "", name: "Загрузка", tag: "12341", uid: "123451423123"},
			{photo: "", name: "Загрузка", tag: "12342", uid: "123451423123"},
			{photo: "", name: "Загрузка", tag: "12343", uid: "123451423123"},
		]

	if(loading)
		return (
			<div className={styles.WrapperContactsList}>
				<UserList users={fakeUsers} isLoading={true}/>
			</div>
		)


	if(!BanList?.length)
		return (
			<div style={{display: 'grid', placeItems: 'center', width: '100%'}}>
				<SettingsDefaultBlock dopClass={styles.Center}>
					Список пуст
				</SettingsDefaultBlock>
			</div>
		)

	return (
		<div>
			<UserList users={BanList}/>
		</div>
	)
}

export default ContactsBanList
