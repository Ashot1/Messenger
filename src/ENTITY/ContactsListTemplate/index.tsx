import styles from './ContactsListTemplate.module.sass'
import { FC } from 'react'
import {IContactsLIstTemplate} from "./Types.ts";
import {Link} from "react-router-dom";
import UserData from "../../UI/UserData";
import BorderedButton from "../../UI/BorderedButton";

const ContactsListTemplate: FC<IContactsLIstTemplate> = ({children, data, loading}) => {
	return (
		<section className={styles.section}>
			<h1>{children}</h1>
			<ul>
				{data.map(item => (
					<li key={item.tag}>
						<Link to={`/profile/${item.uid}`}>
							<UserData photo={item.photo} name={item.name} secondaryText={item.tag} loading={loading}/>
						</Link>
						<div>
							<BorderedButton
								reversed
								BGColor="var(--redColor)"
								color="#fff">
								Отклонить заявку
							</BorderedButton>
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}

export default ContactsListTemplate
