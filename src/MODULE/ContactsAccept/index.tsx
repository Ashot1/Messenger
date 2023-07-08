import styles from './ContactsAccept.module.sass'
import { FC } from 'react'
import {useAppSelector} from "../../HOOK";
import {useGetAcceptDataQuery} from "../../STORE/firebaseApi.ts";
// import ContactsListTemplate from "../../ENTITY/ContactsListTemplate";
// import BorderedButton from "../../UI/BorderedButton";
import UserList from "../../ENTITY/UserList";

const ContactsAccept: FC = () => {

	const user = useAppSelector(state => state.user),
		{data, isLoading} = useGetAcceptDataQuery({dataTo: user.acceptListTo, dataFrom: user.acceptListFrom}, {skip: !user.uid}),
		fakeUsers = [
			{photo: "", name: "Загрузка", tag: "12341", uid: "123451423123"},
			{photo: "", name: "Загрузка", tag: "12342", uid: "123451423123"}
		]

	const loading = isLoading || user.loadingInfo || user.loadingLists || user.loadingAcceptFrom

	if(loading)
		return(
			<div className={styles.ContactsAcceptWrapper}>
				<UserList users={fakeUsers} title="Входящие" isLoading={loading}/>
				<UserList users={fakeUsers} title="Исходящие" isLoading={loading}/>

			</div>
		)

	if(data) return (
		<div className={styles.ContactsAcceptWrapper}>
			<UserList users={data?.acceptTo} title="Входящие" dopClass={styles.TopList}/>
			<UserList users={data?.acceptFrom} title="Исходящие"/>
{/*			<ContactsListTemplate data={data?.acceptFrom} title="Исходящие">
				<BorderedButton
					BGColor="var(--redColor)"
					color="#fff"
					click={() => deleteAccept({id: id, text: 'Заявка отменена', userID: userSelector.uid})}>
					Отменить заявку
				</BorderedButton>
			</ContactsListTemplate>

			<ContactsListTemplate data={data?.acceptTo} title="Входящие">

			</ContactsListTemplate>*/}
		</div>
	)
}

export default ContactsAccept
