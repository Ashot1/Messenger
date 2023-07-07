import styles from './ProfileHeader.module.sass'
import {FC, useEffect, useState} from 'react'
import SettingsInfo from "../../ENTITY/SettingsInfo";
import {IProfileHeader} from "./Types.ts";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import ProfileFriendButtons from "../../ENTITY/ProfileFriendButtons";

export type UserInfo = {
	name: string,
	tag: string,
	photo: string,
	settings: {canAddToFriends: boolean, canOtherMessage: boolean},
	posts: string[]
}

const ProfileHeader: FC<IProfileHeader> = ({id}) => {

	const [Loading, setLoading] = useState(true),
		[User, setUser] = useState<UserInfo>()

	useEffect(() => {
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
	}, [id])

	if(Loading)
		return(
			<div className={styles.Wrapper}>
				<SettingsInfo tag="@12345" photo={undefined} name="Вазген" loading={Loading}>
					<p></p>
				</SettingsInfo>
			</div>
		)

	if(User) return (
		<div className={styles.Wrapper}>
			<SettingsInfo tag={`@${User.tag}`} photo={User.photo} name={User.name}>
				<ProfileFriendButtons id={id} User={User}/>
			</SettingsInfo>
		</div>
	)
}

export default ProfileHeader
