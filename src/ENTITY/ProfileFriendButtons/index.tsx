import {FC} from 'react'
import BorderedButton from "../../UI/BorderedButton";
import {useAppSelector} from "../../HOOK";
import {IProfileFriendsButton} from "./Types.ts";
import {useAddToListMutation, useGetListsQuery} from "../../STORE/firebaseAPI2.ts";
import {useAddAcceptFromMutation, useDeleteAcceptFromMutation, useGetAcceptFromQuery} from "../../STORE/firebaseApi.ts";
import styles from "./ProfileFriendButtons.module.sass"
import CustomNotification from "../../UI/CustomNotification";

const ProfileFriendButtons: FC<IProfileFriendsButton> = ({id, User}) => {

	const userSelector = useAppSelector(state => state.user),
		{data: CurrentUser, isLoading: loadingCurrentUserData} = useGetListsQuery({id: userSelector.uid}, {skip: userSelector.uid === undefined}),
		{data: PageUser, isLoading: loadingPageUserData} = useGetListsQuery({id: id}),
		{data: AcceptFrom, isLoading: loadingAcceptFromData} = useGetAcceptFromQuery(userSelector.uid, {skip: userSelector.uid === undefined}),
		[deleteAccept,  ] = useDeleteAcceptFromMutation(),
		[changeParam] = useAddToListMutation(),
		[addToFriend] = useAddAcceptFromMutation()

	if(userSelector.loading || loadingCurrentUserData || loadingPageUserData || loadingAcceptFromData) //srZ8agTqkjcaMAC4IgSFUM0o46y2
		return <BorderedButton
			BGColor="transparent"
			color="transparent"
			dopClass={styles.LoadingButton}>
			Удалить из контактов
		</BorderedButton>

	if(!User || !AcceptFrom || !PageUser)
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

	else if(CurrentUser?.friends.includes(id))
		return <BorderedButton
			BGColor="var(--redColor)"
			color="#fff"
			click={() => {
				if(!userSelector.uid) return
				changeParam({
					id: userSelector.uid,
					massive: 'friendList',
					values: CurrentUser.friends.filter(item => item !== id).map(guy => ({stringValue: guy}))
				})
				changeParam({
					id: id,
					massive: 'friendList',
					values: PageUser.friends.filter(item => item !== userSelector.uid).map(guy => ({stringValue: guy}))
				})
			}}>
			Удалить из контактов
		</BorderedButton>

	else if(CurrentUser?.acceptTo.includes(id))
		return (
			<>
				<BorderedButton
					BGColor="#4487a2"
					color="#fff"
					click={() => {
						if(!userSelector.uid) return
						changeParam({
							id: userSelector.uid,
							massive: 'acceptList',
							values: CurrentUser.acceptTo.filter(item => item !== id).map(guy => ({stringValue: guy}))
						})
						changeParam({
							id: id,
							massive: 'acceptList',
							values: PageUser.acceptTo.filter(item => item !== userSelector.uid).map(guy => ({stringValue: guy}))
						})
						changeParam({
							id: userSelector.uid,
							massive: 'friendList',
							values: CurrentUser.friends.concat(id).map(guy => ({stringValue: guy}))
						})
						changeParam({
							id: id,
							massive: 'friendList',
							values: PageUser.friends.concat(userSelector.uid).map(guy => ({stringValue: guy}))
						})
					}}>
					Принять заявку
				</BorderedButton>
				<BorderedButton
					reversed
					BGColor="var(--redColor)"
					color="#fff"
					click={() =>
						changeParam({
							id: userSelector.uid,
							massive: 'acceptList',
							values: CurrentUser.acceptTo.filter(item => item !== id).map(guy => ({stringValue: guy}))
						})
							.then(() => CustomNotification('Заявка отклонена'))
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

	else if( AcceptFrom.includes(id) )
		return <BorderedButton
				BGColor="var(--redColor)"
				color="#fff"
				click={() => deleteAccept({id: id, text: 'Заявка отменена', userID: userSelector.uid})}>
				Отменить заявку
			</BorderedButton>

	else return <BorderedButton
			BGColor="#4487a2"
			color="#fff"
			click={() => addToFriend({id: id, text: 'Заявка отправлена', userID: userSelector.uid})}>
			Добавить в контакты
		</BorderedButton>

}



export default ProfileFriendButtons
