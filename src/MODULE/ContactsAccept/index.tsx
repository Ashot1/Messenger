import styles from './ContactsAccept.module.sass'
import { FC } from 'react'
import {useAppSelector} from "../../HOOK";
import {useGetAcceptDataQuery} from "../../STORE/firebaseApi.ts";
import ContactsListTemplate from "../../ENTITY/ContactsListTemplate";

const ContactsAccept: FC = () => {

	const user = useAppSelector(state => state.user),
		{data, isLoading} = useGetAcceptDataQuery({dataTo: user.acceptListTo, dataFrom: user.acceptListFrom}, {skip: !user.uid}),
		fakeUsers = [
			{photo: "", name: "Загрузка", tag: "12341", uid: "123451423123"},
			{photo: "", name: "Загрузка", tag: "12342", uid: "123451423123"}
		]

	const loading = isLoading || user.loading.loadingInfo || user.loading.loadingLists || user.loading.loadingAcceptFrom

	if(loading)
		return(
			<div className={styles.ContactsAcceptWrapper}>

				<ContactsListTemplate data={fakeUsers} type="acceptTo" loading={true}>
					Входящие
				</ContactsListTemplate>

				<ContactsListTemplate data={fakeUsers} type="acceptFrom" loading={true}>
					Исходящие
				</ContactsListTemplate>
			</div>
		)

	if(data) return (
		<div className={styles.ContactsAcceptWrapper}>
			<ContactsListTemplate data={data?.acceptTo} type="acceptTo">
				Входящие
			</ContactsListTemplate>

			<ContactsListTemplate data={data?.acceptFrom} type="acceptFrom">
				Исходящие
			</ContactsListTemplate>
		</div>
	)
}

export default ContactsAccept
