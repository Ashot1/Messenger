import styles from './HeaderActionsBar.module.sass'
import {FC, useState} from 'react'
import {IHeaderActionsBar} from "./Types.ts";
import UserCircle from "../../UI/UserCircle";
import userpng from "../../ASSET/The-ROG-Milky-Way_1920x1080.jpg";
import NotifPNG from '../../ASSET/icon-notification1.png'
import ModalBlock from "../../UI/ModalBlock";
import {Link} from "react-router-dom";
import {AnimatePresence} from "framer-motion";

const HeaderActionsBar: FC<IHeaderActionsBar> = () => {
	
	const [OpenState, setOpenState] = useState({notif: false, user: false})
	
	return (
		<div className={styles.actions}>
			<UserCircle url={NotifPNG} onclick={() => setOpenState({notif: !OpenState.notif, user: false})} dopClass={styles.Notification}/>
			<UserCircle url={userpng} onclick={() => setOpenState({notif: false, user: !OpenState.user})} dopClass={styles.UserLogo}/>
			<AnimatePresence>
				{OpenState.notif && <ModalBlock dopClass={styles.NotifModal}>В разработке</ModalBlock>}
			</AnimatePresence>
			<AnimatePresence>
				{OpenState.user && <ModalBlock dopClass={styles.UserModal}>
					<ul>
						<li><Link to="/settings">Настройки</Link></li>
						<li className={styles.RedButton}>Выйти</li>
					</ul>
				</ModalBlock>}
			</AnimatePresence>
		</div>
	)
}

export default HeaderActionsBar
