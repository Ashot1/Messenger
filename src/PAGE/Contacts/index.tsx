import styles from './Contacts.module.sass'
import {FC, useState} from 'react'
import {Navigate, Outlet, useLocation} from "react-router-dom";
import Search from "../../UI/Search";
import {useForm} from "react-hook-form";
import Menu from "../../ENTITY/Menu";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import UserList from "../../ENTITY/UserList";
import {UserFromList} from "../../ENTITY/UserList";

const Contacts: FC = () => {

	const {
		register,
		handleSubmit
	} = useForm<{Search: string}>(),
		location = useLocation(),
		[UserListDB, setUserListDB] = useState<UserFromList[]>([])

	if(location.pathname === "/contacts") return <Navigate to="/contacts/list"/>


	const Submit = async (data: {Search: string}) => {
		setUserListDB([])
		if(!data.Search) return
		const UserDocs = await getDocs(collection(db, "Users"))

		UserDocs.forEach(item => {
			if(item.data().tag.toLowerCase().includes(data.Search))
				setUserListDB(prevState => [...prevState, {tag: `@${item.data().tag}`, name: item.data().name, photo: item.data().photo, uid: item.id}])

		})

	}

	return (
		<div className={styles.Contacts}>
			<div className={styles.content}>
				<form onSubmit={handleSubmit(Submit)}>
					<Search register={register}/>
				</form>
				<Menu content={[{url: '/contacts/list', title: 'Список'}, {url: '/contacts/accept', title: 'Заявки'}]}/>
				{!UserListDB.length && <Outlet/>}
				{UserListDB.length > 0 && <UserList users={UserListDB} title="Результаты поиска"/>}
			</div>
		</div>
	)
}

export default Contacts
