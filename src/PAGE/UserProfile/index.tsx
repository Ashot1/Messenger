import styles from './UserProfile.module.sass'
import {FC, useEffect, useState} from 'react'
import ProfileHeader, {UserInfo} from "../../MODULE/ProfileHeader";
import {Navigate, useParams} from "react-router-dom";
import ProfilePosts from "../../MODULE/ProfilePosts";
import {useAppSelector} from "../../HOOK";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";

const UserProfile: FC = () => {
	const {id} = useParams()
	if(!id) return <Navigate to="/notfound"/>

	const [Loading, setLoading] = useState(true),
		[User, setUser] = useState<UserInfo>(),
		userSelector = useAppSelector(state => state.user)

	useEffect(() => {
		if(!userSelector.userDisplayName || !userSelector.tag) return
		if(id === userSelector.uid) {
			setUser({
				name: userSelector.userDisplayName,
				tag: userSelector.tag,
				photo: userSelector.userPhoto,
				settings: userSelector.settings,
				posts: userSelector.posts
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
					posts: response.data()?.posts
				})
				setLoading(false)
			})
	}, [id, userSelector])

	const condition = User?.settings.canOtherSeePosts || id === userSelector.uid

	return (
		<div className={styles.Settings}>
			<div className={styles.content}>
				<ProfileHeader id={id} Loading={Loading} User={User}/>
				{Loading && <ProfilePosts id={id} User={User} Loading={Loading} currentUserID={userSelector.uid}/>}

				{condition
					? <ProfilePosts id={id} User={User} Loading={Loading} currentUserID={userSelector.uid}/>

					: !Loading && <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
							<SettingsDefaultBlock>
								<p style={{width: '100%', display: 'flex', justifyContent: 'center', fontSize: '1rem'}}>Пользователь скрыл свои посты</p>
							</SettingsDefaultBlock>
						</div>}
			</div>
		</div>
	)
}

export default UserProfile