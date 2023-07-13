import styles from './HeaderActionsBar.module.sass'
import {FC, memo, useState} from 'react'
import {IHeaderActionsBar} from "./Types.ts";
import UserCircle from "../../UI/UserCircle";
import userPNG from "../../ASSET/icon-avatar.png";
import NotifPNG from '../../ASSET/icon-notification1.png'
import ModalBlock from "../../UI/ModalBlock";
import {Link} from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth, db} from "../../firebaseInit.ts";
import {useAppSelector} from "../../HOOK";
import ModalWindow from "../../UI/ModalWindow";
import CustomButton from "../../UI/CustomButton";
import newsIco from "../../ASSET/icon-news.png"
import deleteIco from "../../ASSET/icon-delete.png"
import {doc, updateDoc} from "firebase/firestore";

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

	const deleteNotification = async (notif: {text: string, createAt: string, icon: string}) => {
		if(!user?.uid) return
		await updateDoc(doc(db, "Notifications", user.uid), {
			notifications: user.notifications.filter(notification => notification !== notif)
		})
	}

	return (
		<div className={styles.actions}>
			<UserCircle url={NotifPNG}
						onclick={() => setOpenState({notif: !OpenState.notif, user: false})} dopClass={styles.Notification}
						style={{opacity: OpenState.notif ? '.5' : '1'}}
						data-count={user.notifications.length > 9 ? "9+" : user.notifications.length}/>
			<UserCircle url={user.userPhoto || userPNG}
						onclick={() => setOpenState({notif: false, user: !OpenState.user})} dopClass={styles.UserLogo}
						style={{opacity: OpenState.user ? '.5' : '1', filter: !user.userPhoto ? 'var(--invertFilter)' : ''}}
			onBlur={() => HideWhenBlur('user')} loading={user.loading.loadingInfo}/>

			<ModalBlock openState={OpenState.notif} dopClass={styles.NotifModal}>
				{user.notifications.length < 1
					&& <p style={{width: '100%', height: '93%', display: 'grid', placeItems: 'center', color: 'var(--MainColor)'}}>Пусто</p>}
				<ul>
					{user.notifications.map((notif, index) => {
						let src = notif.icon
						const systems = ['newsIcon']
						if(systems[0] === src) src = newsIco

						return <li key={index} onClick={() => deleteNotification(notif)}>
								{systems.includes(notif.icon)
									? <img src={src} alt="фото" className={styles.SystemImg}/>
									: <img src={src || userPNG} alt="фото" className={styles.UserImg}/>}
								<div className={styles.NotifText}>
									<p>{notif.text}</p>
									<span>{notif.createAt}</span>
								</div>
								<button>
									<img src={deleteIco} alt="Удалить уведомление"/>
								</button>
							</li>
					})}
				</ul>
			</ModalBlock>

			<ModalBlock openState={OpenState.user} dopClass={styles.UserModal}>
				<ul>
					<li onClick={() => window.location.reload()}>Обновить</li>
					<Link to="/settings/main"><li>Настройки</li></Link>
					<li className={styles.RedButton} onClick={() => setModal(true)}>Выйти</li>
				</ul>
			</ModalBlock>

			<ModalWindow openState={Modal} width={30} bgClick={() => setModal(false)}>
				<h2 className={styles.ModalText}>Выйти из аккаунта?</h2>
				<div className={styles.ModalButtons}>
					<CustomButton onclick={SignOut} dopClass={styles.Quit}>Выход</CustomButton>
					<CustomButton onclick={() => setModal(false)} dopClass={styles.Close}>Отмена</CustomButton>
				</div>
			</ModalWindow>
		</div>
	)
}

export default memo(HeaderActionsBar)
