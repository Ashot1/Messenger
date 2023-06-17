import styles from './HeaderActionsBar.module.sass'
import {FC, useState} from 'react'
import {IHeaderActionsBar} from "./Types.ts";
import UserCircle from "../../UI/UserCircle";
import userPNG from "../../ASSET/The-ROG-Milky-Way_1920x1080.jpg";
import NotifPNG from '../../ASSET/icon-notification1.png'
import ModalBlock from "../../UI/ModalBlock";
import {Link} from "react-router-dom";
import {AnimatePresence} from "framer-motion";

const HeaderActionsBar: FC<IHeaderActionsBar> = () => {
	
	const [OpenState, setOpenState] = useState({notif: false, user: false})

	return (
		<div className={styles.actions}>
			<UserCircle url={NotifPNG}
						onclick={() => setOpenState({notif: !OpenState.notif, user: false})} dopClass={styles.Notification}
						style={{opacity: OpenState.notif ? '.5' : '1'}}/>
			<UserCircle url={userPNG}
						onclick={() => setOpenState({notif: false, user: !OpenState.user})} dopClass={styles.UserLogo}
						style={{opacity: OpenState.user ? '.5' : '1'}}/>
			<AnimatePresence key="NotifModal">
				{OpenState.notif && <ModalBlock dopClass={styles.NotifModal}>В разработке</ModalBlock>}
			</AnimatePresence>
			<AnimatePresence key="UserModal">
				{OpenState.user && <ModalBlock dopClass={styles.UserModal}>
					<ul>
						<li onClick={() => window.location.reload()}>Обновить</li>
						<li><Link to="/settings">Настройки</Link></li>
						<li className={styles.RedButton}>Выйти</li>
					</ul>
				</ModalBlock>}
			</AnimatePresence>
		</div>
	)
}

//onBlur={() => setOpenState({notif: false, user: false})}

export default HeaderActionsBar
