import styles from './Contacts.module.sass'
import { FC } from 'react'
/*import ContactsMenu from "../../MODULE/ContactsMenu";
import {Outlet, useSearchParams} from "react-router-dom";
import Search from "../../UI/Search";
import {useForm} from "react-hook-form";*/

const Contacts: FC = () => {

/*
	const {
		register,
		handleSubmit
	} = useForm<{Search: string}>(),
		[SearchParams, setSearchParams] = useSearchParams()

	const Submit = (data: {Search: string}) => {
		setSearchParams({search: data.Search})
	}
*/

	return (
		<div className={styles.Contacts}>
			<div className={styles.content}>
		{/*		<form onSubmit={handleSubmit(Submit)}>
					<Search register={register}/>
				</form>
				<ContactsMenu/>
				<Outlet/>*/}
			</div>
		</div>
	)
}

export default Contacts
