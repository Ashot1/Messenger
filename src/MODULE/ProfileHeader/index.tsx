import styles from './ProfileHeader.module.sass'
import {FC, useEffect, useState} from 'react'
import SettingsInfo from "../../ENTITY/SettingsInfo";
import {IProfileHeader, UserInfo} from "./Types.ts";
import ProfileFriendButtons from "../../ENTITY/ProfileFriendButtons";
import BorderedButton from "../../UI/BorderedButton";
import ProfileAddAdminButton from "../../ENTITY/ProfileAddAdminButton";
import {addDoc, collection, doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import {useAppSelector} from "../../HOOK";
import {useNavigate} from "react-router-dom";

const ProfileHeader: FC<IProfileHeader> = ({User, Loading, id, setUser}) => {

	const userSelector = useAppSelector(state => state.user),
		[PageUser, setPageUser]
			= useState<{friends: string[], acceptTo: string[]}>({acceptTo: [], friends: []}),
		navigate = useNavigate()

	useEffect(() => {
		getDoc(doc(db, "Lists", id))
			.then(response => setPageUser({acceptTo: response.data()?.acceptList, friends: response.data()?.friendList}))
	}, [id])

	const sendMessage = () => {
		const dialog = userSelector.messages.filter(item => item.users.includes(id))
		if(dialog.length) return navigate(`/messages/${dialog[0].id}`)
		addDoc(collection(db, 'Messages'), {
			message: [],
			members: [id, userSelector.uid],
			type: 'private'
		})
			.then((response) => navigate(`/messages/${response.id}`))
	}

	if(Loading)
		return(
			<div className={styles.Wrapper}>
				<SettingsInfo tag="@12345" photo={undefined} name="Вазген" loading={Loading}>
					<BorderedButton
						BGColor="transparent"
						color="transparent"
						dopClass={styles.LoadingButton}>
						Удалить из контактов
					</BorderedButton>
					<BorderedButton
						BGColor="transparent"
						color="transparent"
						dopClass={styles.LoadingButton}>
						Удалить из контактов
					</BorderedButton>
				</SettingsInfo>
			</div>
		)

	if(User && userSelector.uid) return (
		<div className={styles.Wrapper}>
			<SettingsInfo tag={`@${User.tag}`} photo={User.photo} name={User.name}>

				{((User.settings.canOtherMessage || userSelector.friendList.includes(id)) && id !== userSelector.uid)
					&& <BorderedButton click={sendMessage} BGColor="var(--MainColor)"
									   color="var(--InvertMainColor)">Сообщение</BorderedButton>}

				<ProfileFriendButtons id={id} User={User} PageUser={PageUser}/>

				<ProfileAddAdminButton id={id} userPage={User} setUser={setUser}/>
			</SettingsInfo>
		</div>
	)
}

export default ProfileHeader
export type {UserInfo}