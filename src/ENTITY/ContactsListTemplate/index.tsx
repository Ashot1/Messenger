import styles from './ContactsListTemplate.module.sass'
import { FC } from 'react'
import {IContactsLIstTemplate} from "./Types.ts";
import {Link} from "react-router-dom";
import UserData from "../../UI/UserData";
import {AcceptDenyButtons, CancelButton} from "../ProfileFriendButtons";

const ContactsListTemplate: FC<IContactsLIstTemplate> = ({children, data, loading, type}) => {

	return (
		<section className={styles.section}>
			<h1>{children}</h1>
			{
				data.length < 1 && <p style={{display: "grid", placeItems: 'center', padding: '35px 0'}}>
					Список пуст
				</p>
			}
			<ul>
				{data.map(item => (
					<li key={item.tag}>
						<div className={styles.UserInfo}>
							<Link to={`/profile/${item.uid}`} className={styles.UserLink}>
								<UserData
									photo={item.photo}
									name={item.name}
									secondaryText={item.tag}
									loading={loading}
									logoDopClass={styles.AvatarList}
									TextDopClass={styles.TextDataList}/>
							</Link>
							<div className={styles.actions}>
								{type === "acceptTo" && <AcceptDenyButtons id={item.uid}/>}
								{type === "acceptFrom" && <CancelButton id={item.uid}/>}
							</div>
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}

export default ContactsListTemplate
