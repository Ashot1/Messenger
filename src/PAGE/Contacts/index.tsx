import styles from './Contacts.module.sass'
import {FC, useEffect, useState} from 'react'
import {Navigate, Outlet, useLocation, useSearchParams} from "react-router-dom";
import Search from "../../UI/Search";
import {useForm} from "react-hook-form";
import Menu from "../../ENTITY/Menu";
import {collection, getDocs, query, startAfter, limit} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import UserList from "../../ENTITY/UserList";
import {UserFromList} from "../../ENTITY/UserList";
import BorderedButton from "../../UI/BorderedButton";
import {DocumentData, QuerySnapshot} from "@firebase/firestore";

const Contacts: FC = () => {

	const {
		register,
		handleSubmit
	} = useForm<{Search: string}>(),
		location = useLocation(),
		[UserListDB, setUserListDB] = useState<UserFromList[]>([]),
		[LastElement, setLastElement] = useState<DocumentData | undefined>(undefined),
		[SearchParams, seSearchParams] = useSearchParams()

	useEffect(() => {
		if(!SearchParams.get('search')) return
		getData(undefined).then(response => displayUsers(response))

	}, [SearchParams])

	if(location.pathname === "/contacts") return <Navigate to="/contacts/list"/>

	const getData = async (ref: DocumentData | undefined) => {
		let q
		if(ref) q = query(collection(db, "Users"), startAfter(ref), limit(15))
		else q = query(collection(db, "Users"), limit(15))
		return await getDocs(q)

	}

	const displayUsers = (users: QuerySnapshot<DocumentData>) => {
		users.forEach((item) => {
			if(item.data().tag.toLowerCase().includes(SearchParams.get('search'))) {
				setUserListDB(prevState => [...prevState, {
					tag: `@${item.data().tag}`,
					name: item.data().name,
					photo: item.data().photo,
					uid: item.id
				}])
			}
		})
		setLastElement(users.docs.at(-1))
	}

	const loadNext = async () => {
		if(!LastElement) return
		const docs = await getData(LastElement)
		displayUsers(docs)
	}

	const Submit = async (data: {Search: string}) => {
		setUserListDB([])
		if(!data.Search) return
		seSearchParams({search: data.Search})
	}

	return (
		<div className={styles.Contacts}>
			<div className={styles.content}>
				<form onSubmit={handleSubmit(Submit)}>
					<Search register={register}/>
				</form>
				<Menu content={[{url: '/contacts/list', title: 'Контакты'}, {url: '/contacts/accept', title: 'Заявки'}]}/>
				{!SearchParams.get('search') && <Outlet/>}
				{SearchParams.get('search') && <UserList users={UserListDB} title="Результаты поиска"/>}
				{SearchParams.get('search') && <div style={{width: '100%', display: 'grid', placeItems: 'center', marginTop: '50px'}}>
					<BorderedButton click={loadNext} reversed>Показать больше</BorderedButton>
				</div>}
			</div>
		</div>
	)
}

export default Contacts
