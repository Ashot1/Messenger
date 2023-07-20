import styles from './MessagesList.module.sass'
import {FC} from 'react'
import {useAppSelector} from "../../HOOK";
import UserData from "../../UI/UserData";
import CustomButton from "../../UI/CustomButton";
import {UserFromList} from "../../ENTITY/UserList";
import {useParams} from "react-router-dom";


const MessagesList: FC<{ data: UserFromList[] | undefined, loading: boolean }> = ({data, loading}) => {

	const user = useAppSelector(state => state.user),
		params = useParams(),
		media768 = matchMedia("(max-width: 768px)").matches

	if(params.id && media768) return
	
	if(loading) return <LoadingMessageList/>

	if((!data || data.length <= 0) && !loading) return (
		<div className={styles.nonInfo}>
			У вас пока нет диалогов
		</div>
	)

	else if(data) return (
		<div className={styles.MessageList}>
		<ul>
			{data.map(dataUser => {

				let url = ''
				let lastWord = 'Напишите сообщение'
				user.messages.forEach(chat => {
					if (chat.users.includes(dataUser.uid) && chat.type === 'private') {
						url = chat.id
						if(!chat.message.length) return
						const who = chat.message.at(-1)?.from === user.uid ? 'Вы:' : ''
						lastWord = `${who} ${chat.message.at(-1)?.text}` || 'Напишите сообщение'
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
							TextDopClass={styles.textUser}
							isButton={false}/>
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
					<CustomButton dopClass={`${styles.MessageButton} ${styles.bg}`}>
						<UserData
							name="Загрузка"
							photo=" "
							secondaryText="Загрузка"
							logoDopClass={`${styles.logoUser} ${styles.loadingLogo}`}
							TextDopClass={`${styles.textUser} ${styles.loadingText}`}
							isButton={false}/>
					</CustomButton>
				</li>
				<li>
					<CustomButton dopClass={`${styles.MessageButton} ${styles.bg}`}>
						<UserData
							name="Загрузка"
							photo=" "
							secondaryText="Загрузка"
							logoDopClass={`${styles.logoUser} ${styles.loadingLogo}`}
							TextDopClass={`${styles.loadingText}`}
							isButton={false}/>
					</CustomButton>
				</li>
				<li>
					<CustomButton dopClass={`${styles.MessageButton} ${styles.bg}`}>
						<UserData
							name="Загрузка"
							photo=" "
							secondaryText="Загрузка"
							logoDopClass={`${styles.logoUser} ${styles.loadingLogo}`}
							TextDopClass={`${styles.loadingText}`}
							isButton={false}/>
					</CustomButton>
				</li>
			</ul>
		</div>
	)
}