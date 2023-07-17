import styles from './MessageHeader.module.sass'
import { FC } from 'react'
import CustomButton from "../../UI/CustomButton";
import UserData from "../../UI/UserData";
import CrossButton from "../../UI/CrossButton";
import {IMessageHeader} from "./Types.ts";
import {useLocation} from "react-router-dom";

const MessageHeader: FC<IMessageHeader> = ({PageUser, loading}) => {

	const location = useLocation()

	if(loading) return (
		<nav className={styles.Head}>
			<CustomButton isLink url={location.pathname} dopClass={styles.dataWrapper}>
				<UserData
					name="Загрузка"
					photo="Загрузка"
					secondaryText="Загрузка"
					logoDopClass={styles.LogoDialog}
					TextDopClass={styles.TextDialog}
					loading={loading}/>
			</CustomButton>
			<span className={styles.CloseButtonPos}>
					<CrossButton isLink url="/messages"/>
				</span>
		</nav>
	)

	return (
		<nav className={styles.Head}>
			<CustomButton isLink url={`/profile/${PageUser.uid}`} dopClass={styles.dataWrapper}>
				<UserData
					name={PageUser.name}
					photo={PageUser.photo}
					secondaryText={PageUser.tag}
					logoDopClass={styles.LogoDialog}
					TextDopClass={styles.TextDialog}/>
			</CustomButton>
			<span className={styles.CloseButtonPos}>
					<CrossButton isLink url="/messages"/>
				</span>
		</nav>
	)
}

export default MessageHeader
