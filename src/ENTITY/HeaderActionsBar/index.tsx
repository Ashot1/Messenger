import styles from './HeaderActionsBar.module.sass'
import {FC, memo, useState} from 'react'
import {IHeaderActionsBar} from "./Types.ts";
import UserCircle from "../../UI/UserCircle";
import userPNG from "../../ASSET/icon-avatar.png";
import NotifPNG from '../../ASSET/icon-notification1.png'
import ModalBlock from "../../UI/ModalBlock";
import {Link} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import { signOut } from "firebase/auth";
import {auth} from "../../firebaseInit.ts";
import {useAppSelector} from "../../HOOK";
import ModalWindow from "../../UI/ModalWindow";
import CustomButton from "../../UI/CustomButton";


const HeaderActionsBar: FC<IHeaderActionsBar> = () => {

	const [OpenState, setOpenState] = useState<{[key: string]: boolean}>({notif: false, user: false}),
	 	user = useAppSelector(state => state.user),
	 	[Modal, setModal] = useState(false);

	const SignOut = () => {
		signOut(auth)
			.then(() => window.location.reload())
			.catch((e) => alert(e))
	}

	const HideWhenBlur = (state: string) => setTimeout(() => setOpenState(prevState => {
		if (prevState[state]) return {notif: false, user: false}
		return prevState
	}), 250)

	return (
		<div className={styles.actions}>
			<UserCircle url={NotifPNG}
						onclick={() => setOpenState({notif: !OpenState.notif, user: false})} dopClass={styles.Notification}
						style={{opacity: OpenState.notif ? '.5' : '1'}}
						onBlur={() => HideWhenBlur('notif')}/>
			<UserCircle url={user.userPhoto || userPNG}
						onclick={() => setOpenState({notif: false, user: !OpenState.user})} dopClass={styles.UserLogo}
						style={{opacity: OpenState.user ? '.5' : '1', filter: !user.userPhoto ? 'var(--invertFilter)' : ''}}
			onBlur={() => HideWhenBlur('user')}/>

			<AnimatePresence key="NotifModal">
				{OpenState.notif && <ModalBlock dopClass={styles.NotifModal}>В разработке</ModalBlock>}
			</AnimatePresence>

			<AnimatePresence key="UserModal">
				{OpenState.user && <ModalBlock dopClass={styles.UserModal}>
					<ul>
						<li onClick={() => window.location.reload()}>Обновить</li>
						<Link to="/settings/main"><li>Настройки</li></Link>
						<li className={styles.RedButton} onClick={() => setModal(true)}>Выйти</li>
					</ul>
				</ModalBlock>}
			</AnimatePresence>
			{Modal && <ModalWindow width={30} bgClick={() => setModal(false)}>
				<h2 className={styles.ModalText}>Выйти из аккаунта?</h2>
				<div className={styles.ModalButtons}>
					<CustomButton onclick={SignOut} dopClass={styles.Quit}>Выход</CustomButton>
					<CustomButton onclick={() => setModal(false)} dopClass={styles.Close}>Отмена</CustomButton>
				</div>
			</ModalWindow>}
		</div>
	)
}

export default memo(HeaderActionsBar)
