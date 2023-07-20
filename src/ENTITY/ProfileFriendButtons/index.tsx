import {FC} from 'react'
import BorderedButton from "../../UI/BorderedButton";
import {useAppSelector, useLocaleDate} from "../../HOOK";
import {IProfileFriendsButton} from "./Types.ts";
import {useAddToListMutation} from "../../STORE/firebaseAPI2.ts";
import styles from "./ProfileFriendButtons.module.sass"
import CustomNotification from "../../UI/CustomNotification";
import {deleteContact} from "./Functions.ts";
import {useCreateNotificationMutation} from "../../STORE/firebaseApi.ts";
import AcceptDenyButtons from "./AcceptDenyButtons.tsx";
import CancelButton from "./CancelButton.tsx";


const ProfileFriendButtons: FC<IProfileFriendsButton> = ({id, User, PageUser}) => {

	const userSelector = useAppSelector(state => state.user),
		[changeParam] = useAddToListMutation(),
		getDate = useLocaleDate(),
		[createNotifServer] = useCreateNotificationMutation()

	if(userSelector.loading.loadingInfo || userSelector.loading.loadingLists)
		return <BorderedButton
			BGColor="transparent"
			color="transparent"
			dopClass={styles.LoadingButton}>
			Загрузка данных
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
				deleteContact(userSelector, changeParam, id, PageUser)
				createNotifServer({
						toId: id,
						fromPhoto: userSelector.userPhoto,
						getDate: getDate,
						text: `${User.name} удалил вас из контактов`,
						url: ''
					})
			}}>
			Удалить из контактов
		</BorderedButton>

	else if(userSelector.acceptListTo.includes(id))
		return <AcceptDenyButtons id={id} PageUser={PageUser}/>

	else if(!User.settings.canAddToFriends)
		return <BorderedButton
			BGColor="#4487a2"
			color="#fff">
			Пользователь запретил добавлять его в друзья
		</BorderedButton>

	else if( userSelector.acceptListFrom.includes(id) )
		return <CancelButton id={id} PageUser={PageUser}/>

	else return <BorderedButton
			BGColor="#4487a2"
			color="#fff"
			click={async () => {
				if(!userSelector.uid) return
				if(!User.settings.canAddToFriends) return CustomNotification(`Пользователь запретил добавлять его в контакты`, 'error')
				try {
					changeParam({
						id: id,
						massive: 'acceptList',
						values: PageUser.acceptTo.concat(userSelector.uid).map(guy => ({stringValue: guy}))
					})
					createNotifServer(
						{
							toId: id,
							fromPhoto: userSelector.userPhoto,
							getDate: getDate,
							text: `${userSelector.userDisplayName} отправил вам заявку в контакты`,
							url: ''
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

export {AcceptDenyButtons, CancelButton}