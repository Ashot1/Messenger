import styles from './UserProfile.module.sass'
import {FC, useEffect, useState} from 'react'
import ProfileHeader, {PageUserType, UserInfo} from "../../MODULE/ProfileHeader";
import {Navigate, useParams} from "react-router-dom";
import ProfilePosts from "../../MODULE/ProfilePosts";
import {useAppSelector} from "../../HOOK";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";
import LoadingUserProfile from "./LoadingUserProfile.tsx"


const UserProfile: FC = () => {
	const {id} = useParams()
	if(!id) return <Navigate to="/notfound"/>

	const [Loading, setLoading] = useState(true),
		[User, setUser] = useState<UserInfo>(),
		userSelector = useAppSelector(state => state.user),
		[PageUserLists, setPageUserLists] 
			= useState<PageUserType>({acceptTo: [], friends: [], banList: []})

	useEffect(() => {
		if(!id) return
		getDoc(doc(db, "Lists", id))
			.then(response => setPageUserLists(
				{acceptTo: response.data()?.acceptList, friends: response.data()?.friendList, banList: response.data()?.banList}
			))
	}, [id])

	useEffect(() => {
		if(!userSelector.userDisplayName || !userSelector.tag) return
		if(id === userSelector.uid) {
			setUser({
				name: userSelector.userDisplayName,
				tag: userSelector.tag,
				photo: userSelector.userPhoto,
				settings: userSelector.settings,
				posts: userSelector.posts,
				canBanUsers: userSelector.canBanUsers,
				addNews: userSelector.addNews,
				addAdmin: userSelector.addAdmin
			})
			return setLoading(false)
		}

		getDoc(doc(db, "Users", id))
			.then(response => {
				setUser({
					name: response.data()?.name,
					tag: response.data()?.tag,
					photo: response.data()?.photo,
					settings: response.data()?.profileSettings,
					posts: response.data()?.posts,
					canBanUsers: response.data()?.canBanUsers,
					addNews: response.data()?.addNews,
					addAdmin: response.data()?.addAdmin,
					ban: response.data()?.ban
				})
				setLoading(false)
			})
	}, [id, userSelector])

	const changeAdm = (add: UserInfo) => {
		setUser(prev => ({...prev, ...add}))
	}

	const postPrivacyAllowUser = User?.settings.canOtherSeePosts || userSelector.friendList.includes(id),
		userWasBanned = userSelector.uid && PageUserLists.banList.includes(userSelector.uid) || false,
		condition = (postPrivacyAllowUser && !userWasBanned) || id === userSelector.uid

	return (
		<div className={styles.Settings}>
			<div className={styles.content}>
				<ProfileHeader id={id} Loading={Loading} User={User} setUser={changeAdm} PageUserLists={PageUserLists}/>
				
				{Loading && <ProfilePosts id={id} User={User} Loading={Loading} currentUserID={userSelector.uid} setUser={setUser}/>}
				
				{condition
					? <ProfilePosts id={id} User={User} Loading={Loading} currentUserID={userSelector.uid} setUser={setUser}/>

					: !Loading && <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
							<SettingsDefaultBlock>
								<p className={styles.ClearText}>Пользователь скрыл свои посты</p>
							</SettingsDefaultBlock>
						</div>}
			</div>
		</div>
	)
}

export default UserProfile

export {LoadingUserProfile}