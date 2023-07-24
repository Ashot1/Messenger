import styles from './ProfileHeader.module.sass'
import {FC} from 'react'
import SettingsInfo from "../../ENTITY/SettingsInfo";
import {IProfileHeader, UserInfo} from "./Types.ts";
import ProfileFriendButtons from "../../ENTITY/ProfileFriendButtons";
import BorderedButton from "../../UI/BorderedButton";
import ProfileAddAdminButton from "../../ENTITY/ProfileAddAdminButton";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import {useAppSelector} from "../../HOOK";
import {useNavigate} from "react-router-dom";
import ProfileBanButton from "../../ENTITY/ProfileBanButton";

export type PageUserType = {friends: string[], acceptTo: string[], banList: string[]}

const ProfileHeader: FC<IProfileHeader> = ({User, Loading, id, setUser, PageUserLists}) => {

	const userSelector = useAppSelector(state => state.user),
		navigate = useNavigate()

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

	const messagePrivacyAllowUser = User && (User.settings.canOtherMessage || userSelector.friendList.includes(id)) || false,
		pageUserNotCurrent = id !== userSelector.uid,
		userWasBanned = userSelector.uid && PageUserLists.banList.includes(userSelector.uid) || false

	if(User && userSelector.uid) return (
		<div className={styles.Wrapper}>
			<SettingsInfo tag={`@${User.tag}`} photo={User.photo} name={User.name}>

				{messagePrivacyAllowUser && pageUserNotCurrent && !userWasBanned
					&& <BorderedButton click={sendMessage} BGColor="var(--MainColor)"
									   color="var(--InvertMainColor)">Сообщение</BorderedButton>}

				<ProfileFriendButtons id={id} User={User} PageUserLists={PageUserLists}/>

				<ProfileBanButton id={id} PageUserLists={PageUserLists} userBanState={User.ban}/>

				<ProfileAddAdminButton id={id} userPage={User} setUser={setUser}/>
			</SettingsInfo>
		</div>
	)
}

export default ProfileHeader
export type {UserInfo}