import {FC, useEffect, useState} from 'react'
import BorderedButton from "../../UI/BorderedButton";
import {useAppSelector} from "../../HOOK";
import {IProfileFriendsButton} from "./Types.ts";
import {useAddToListMutation} from "../../STORE/firebaseAPI2.ts";
import styles from "./ProfileFriendButtons.module.sass"
import CustomNotification from "../../UI/CustomNotification";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";

const ProfileFriendButtons: FC<IProfileFriendsButton> = ({id, User}) => {

	const userSelector = useAppSelector(state => state.user),
		[changeParam] = useAddToListMutation(),
		[PageUser, setPageUser] = useState<{friends: string[], acceptTo: string[]}>({acceptTo: [], friends: []})

	useEffect(() => {
		getDoc(doc(db, "Lists", id))
			.then(response => setPageUser({acceptTo: response.data()?.acceptList, friends: response.data()?.friendList}))
	}, [id])

	if(userSelector.loadingInfo || userSelector.loadingLists)
		return <BorderedButton
			BGColor="transparent"
			color="transparent"
			dopClass={styles.LoadingButton}>
			Удалить из контактов
		</BorderedButton>

	if(!User)
		return <BorderedButton
		BGColor="#4487a2"
		color="#fff">
			Ошибка
		</BorderedButton>


	if(userSelector.uid === id)
		return <BorderedButton
			url="/settings/main"
			BGColor="#4487a2"
			color="#fff">
			Настройки
		</BorderedButton>

	else if(userSelector.friendList.includes(id))
		return <BorderedButton
			BGColor="var(--redColor)"
			color="#fff"
			click={() => {
				if(!userSelector.uid) return
				try {
					changeParam({
						id: userSelector.uid,
						massive: 'friendList',
						values: userSelector.friendList.filter(item => item !== id).map(guy => ({stringValue: guy}))
					})
					changeParam({
						id: id,
						massive: 'friendList',
						values: PageUser.friends.filter(item => item !== userSelector.uid).map(guy => ({stringValue: guy}))
					})
					CustomNotification('Пользователь удален из контактов')
				} catch (err) {
					CustomNotification(`Ошибка: ${err}`, 'error')
				}
			}}>
			Удалить из контактов
		</BorderedButton>

	else if(userSelector.acceptListTo.includes(id))
		return (
			<>
				<BorderedButton
					BGColor="#4487a2"
					color="#fff"
					click={() => {
						if(!userSelector.uid) return
						try {
							changeParam({
								id: userSelector.uid,
								massive: 'acceptList',
								values: userSelector.acceptListTo.filter(item => item !== id).map(guy => ({stringValue: guy}))
							})
							changeParam({
								id: id,
								massive: 'acceptList',
								values: PageUser.acceptTo.filter(item => item !== userSelector.uid).map(guy => ({stringValue: guy}))
							})
							changeParam({
								id: userSelector.uid,
								massive: 'friendList',
								values: userSelector.friendList.concat(id).map(guy => ({stringValue: guy}))
							})
							changeParam({
								id: id,
								massive: 'friendList',
								values: PageUser.friends.concat(userSelector.uid).map(guy => ({stringValue: guy}))
							})

							CustomNotification('Пользователь добавлен в контакты')

						} catch (err) {
							CustomNotification(`Ошибка: ${err}`, 'error')
						}
					}}>
					Принять заявку
				</BorderedButton>
				<BorderedButton
					reversed
					BGColor="var(--redColor)"
					color="#fff"
					click={() => {
						try{
							changeParam({
								id: userSelector.uid,
								massive: 'acceptList',
								values: userSelector.acceptListTo.filter(item => item !== id).map(guy => ({stringValue: guy}))
							})
							CustomNotification('Заявка отклонена')
						} catch (err) {
							CustomNotification(`Ошибка: ${err}`, 'error')
						}
					}
					}>
					Отклонить заявку
				</BorderedButton>
			</>
		)

	else if(!User.settings.canAddToFriends)
		return <BorderedButton
			BGColor="#4487a2"
			color="#fff">
			Пользователь запретил добавлять его в друзья
		</BorderedButton>

	else if( userSelector.acceptListFrom.includes(id) )
		return <BorderedButton
				BGColor="var(--redColor)"
				color="#fff"
				click={() => {
					if(!userSelector.uid) return
					try {
						changeParam({
							id: id,
							massive: 'acceptList',
							values: PageUser.acceptTo.filter(item => item !== userSelector.uid).map(guy => ({stringValue: guy}))
						})
						CustomNotification('Заявка отменена')
					} catch (e) {
						CustomNotification('Ошибка', 'error')
					}
				}}>
				Отменить заявку
			</BorderedButton>

	else return <BorderedButton
			BGColor="#4487a2"
			color="#fff"
			click={() => {
				if(!userSelector.uid) return
				try {
					changeParam({
						id: id,
						massive: 'acceptList',
						values: PageUser.acceptTo.concat(userSelector.uid).map(guy => ({stringValue: guy}))
					})
					CustomNotification('Заявка отправлена')

				} catch (err) {
					CustomNotification(`Ошибка: ${err}`, 'error')
				}
			}}>
			Добавить в контакты
		</BorderedButton>

}



export default ProfileFriendButtons
