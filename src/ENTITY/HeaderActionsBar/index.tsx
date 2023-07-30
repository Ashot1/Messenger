import styles from './HeaderActionsBar.module.sass'
import {FC, memo, useState} from 'react'
import {IHeaderActionsBar} from "./Types.ts";
import UserCircle from "../../UI/UserCircle";
import userPNG from "../../ASSET/icon-avatar.png";
import NotifPNG from '../../ASSET/icon-notification1.png'
import ModalBlock from "../../UI/ModalBlock";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../HOOK";
import ModalWindow from "../../UI/ModalWindow";
import CustomButton from "../../UI/CustomButton";
import newsIco from "../../ASSET/icon-news.png"
import deleteIco from "../../ASSET/icon-delete.png"
import BorderedButton from "../../UI/BorderedButton";
import {clearNotifications, deleteNotification, SignOut} from "./Functions.ts";

export const SystemsNotifications =  ['newsIcon']

const HeaderActionsBar: FC<IHeaderActionsBar> = () => {

	const [OpenState, setOpenState] = useState<{[key: string]: boolean}>({notif: false, user: false}),
	 	user = useAppSelector(state => state.user),
	 	[Modal, setModal] = useState(false),
		location = useLocation(),
		navigate = useNavigate()

	const HideWhenBlur = (state: string) => setTimeout(() => setOpenState(prevState => {
		if (prevState[state]) return {notif: false, user: false}
		return prevState
	}), 250)


	if(user.loading.loadingInfo || user.loading.loadingAcceptFrom) return (
		<div className={styles.actions}>
			<UserCircle url={NotifPNG} dopClass={styles.Notification}/>
			<UserCircle url='' loading={true} dopClass={styles.UserLogo} onclick={() => setOpenState({notif: false, user: !OpenState.user})}/>
			<ModalBlock openState={OpenState.user} dopClass={styles.UserModal}>
				<ul>
					<li onClick={() => window.location.reload()}>Обновить</li>
					<Link to="/settings/main"><li>Настройки</li></Link>
					<li className={styles.RedButton}>Выйти</li>
				</ul>
			</ModalBlock>
		</div>
	)

	if(user.notifications) return (
		<div className={styles.actions}>
			<UserCircle url={NotifPNG}
						onclick={() => setOpenState({notif: !OpenState.notif, user: false})}
						dopClass={styles.Notification}
						style={{opacity: OpenState.notif ? '.5' : '1'}}
						data-count={user.notifications.length > 9 ? "9+" : user.notifications.length}/>

			<UserCircle url={user.userPhoto || userPNG}
						onclick={() => setOpenState({notif: false, user: !OpenState.user})}
						dopClass={styles.UserLogo}
						style={{opacity: OpenState.user ? '.5' : '1', filter: !user.userPhoto ? 'var(--invertFilter)' : ''}}
						onBlur={() => HideWhenBlur('user')}
						loading={user.loading.loadingInfo}/>

			<ModalBlock openState={OpenState.notif} dopClass={styles.NotifModal}>
				{user.notifications.length < 1
					&& <p className={styles.ClearText}>Пусто</p>}

				{user.notifications.length >= 1
					&& <ul onBlur={() => HideWhenBlur('notif')}>
					{[...user.notifications].reverse().map((notif, index) => {
						let src = notif.icon
						if(SystemsNotifications[0] === src) src = newsIco

						return <li key={index} onClick={() => {
								let url = notif.url
								if(url === '' || !url) url = location.pathname
								navigate(url)
							}}>
								{SystemsNotifications.includes(notif.icon)
									? <img src={src} alt="фото" className={styles.SystemImg}/>
									: <img src={src || userPNG} alt="фото" className={styles.UserImg} style={{filter: !src ? 'var(--invertFilter)' : ''}}/>}
								<div className={styles.NotifText}>
									<p>{notif.text}</p>
									<span>{notif.createAt}</span>
								</div>
								<button onClick={e => {
									e.stopPropagation()
									deleteNotification(notif, user)
								}}>
									<img src={deleteIco} alt="Удалить уведомление"/>
								</button>
							</li>
					})}
				</ul>}

				{user.notifications.length >= 1
					&& <div className={styles.ButtonPosition}>
					<BorderedButton click={() => clearNotifications(user)} BGColor="var(--MainColor)" color="var(--InvertMainColor)" reversed>
						Очистить все
					</BorderedButton>
				</div>}
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
