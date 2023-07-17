import styles from './MessagesList.module.sass'
import {FC} from 'react'
import {useAppSelector} from "../../HOOK";
import UserData from "../../UI/UserData";
import CustomButton from "../../UI/CustomButton";
import {UserFromList} from "../../ENTITY/UserList";
import {useParams} from "react-router-dom";


const MessagesList: FC<{ data: UserFromList[], loading: boolean }> = ({data, loading}) => {

	const user = useAppSelector(state => state.user),
		params = useParams(),
		media768 = matchMedia("(max-width: 768px)").matches

	if(params.id && media768) return
	
	if(loading) return <LoadingMessageList/>

	if(!data || data.length <= 0) return (
		<div className={styles.nonInfo}>
			У вас пока нет диалогов
		</div>
	)

	else return (
		<div className={styles.MessageList}>
		<ul>
			{data.map(dataUser => {

				let url = ''
				let lastWord = ''
				user.messages.forEach(chat => {
					if (chat.users.includes(dataUser.uid) && chat.type === 'private') {
						url = chat.id
						const who = chat.message.at(-1)?.from === user.uid ? 'Вы:' : ''
						lastWord = `${who} ${chat.message.at(-1)?.text}` || ' '
					}
				})

				return <li key={dataUser.tag}>
					<CustomButton isLink url={`/messages/${url}`} dopClass={styles.MessageButton}
								  activeClass={styles.active}>
						<UserData
							name={dataUser.name}
							photo={dataUser.photo}
							secondaryText={lastWord}
							logoDopClass={styles.logoUser}
							TextDopClass={styles.textUser}/>
					</CustomButton>
				</li>
			})}
		</ul>
	</div>
	);
}

export default MessagesList

const LoadingMessageList: FC = () => {
	return (
		<div className={styles.MessageList}>
			<ul>
				<li>
					<CustomButton dopClass={styles.MessageButton}>
						<UserData
							name="Загрузка"
							photo=" "
							secondaryText="Загрузка"
							logoDopClass={`${styles.logoUser} ${styles.loadingLogo}`}
							TextDopClass={`${styles.textUser} ${styles.loadingText}`}/>
					</CustomButton>
				</li>
				<li>
					<CustomButton dopClass={styles.MessageButton}>
						<UserData
							name="Загрузка"
							photo=" "
							secondaryText="Загрузка"
							logoDopClass={`${styles.logoUser} ${styles.loadingLogo}`}
							TextDopClass={`${styles.loadingText}`}/>
					</CustomButton>
				</li>
				<li>
					<CustomButton dopClass={styles.MessageButton}>
						<UserData
							name="Загрузка"
							photo=" "
							secondaryText="Загрузка"
							logoDopClass={`${styles.logoUser} ${styles.loadingLogo}`}
							TextDopClass={`${styles.loadingText}`}/>
					</CustomButton>
				</li>
			</ul>
		</div>
	)
}