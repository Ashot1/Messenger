import styles from './UserProfile.module.sass'
import { FC } from 'react'
import ProfileHeader from "../../MODULE/ProfileHeader";
import {Navigate, useParams} from "react-router-dom";
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";

const UserProfile: FC = () => {
	const {id} = useParams()
	if(!id) return <Navigate to="/notfound"/>

	return (
		<div className={styles.Settings}>
			<div className={styles.content}>
				<ProfileHeader id={id}/>
				<h1 className={styles.PostTitle}>Посты</h1>
				<div className={styles.PostsWrapper}>
					<SettingsDefaultBlock>
						В разработке
					</SettingsDefaultBlock>
				</div>
			</div>
		</div>
	)
}

export default UserProfile