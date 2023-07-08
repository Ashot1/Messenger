import styles from './UserList.module.sass'
import { FC } from 'react'
import {IUserList, UserFromList} from "./Types.ts";
import {Link} from "react-router-dom";
import UserData from "../../UI/UserData";

const UserList: FC<IUserList> = ({users, title, isLoading, dopClass, }) => {
	return (
		<div className={`${styles.UserListWrapper} ${dopClass}`}>
			{title && <h1>{title}</h1>}
			<ul>
				{
					users.length < 1 && <li style={{display: "grid", placeItems: 'center', padding: '35px 0'}}>
							Список пуст
						</li>
				}
				{users.map(item => (
					<li key={item.tag}>
						{!isLoading && <Link to={`/profile/${item.uid}`}>
							<UserData photo={item.photo} name={item.name} secondaryText={item.tag}
									  logoDopClass={styles.ListAvatar}/>
						</Link>}
						{isLoading && <UserData photo={item.photo} name={item.name} secondaryText={item.tag}
												logoDopClass={styles.ListAvatar} loading={isLoading}/>}
					</li>
				))}
			</ul>
		</div>
	)
}

export default UserList
export type {UserFromList}
