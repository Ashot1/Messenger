import styles from './UserListItem.module.sass'
import { FC } from 'react'
import {Link} from "react-router-dom";
import UserData from "../../UI/UserData";
import {IUserListItem} from "./Types.ts";

const UserListItem: FC<IUserListItem> = ({photo, name, uid, loading, tag}) => {
	return (
		<li className={styles.UserProfileInfo}>
			<Link to={`/profile/${uid}`} className={styles.UserProFileLink}>
				<UserData loading={loading} name={name} photo={photo} secondaryText={tag} logoDopClass={styles.UserItemAvatar} TextDopClass={styles.UserInfo}/>
			</Link>
		</li>
	)
}

export default UserListItem
