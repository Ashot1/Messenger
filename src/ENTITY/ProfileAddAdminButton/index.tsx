import styles from './ProfileAddAdminButton.module.sass'
import {FC, useState} from 'react'
import BorderedButton from "../../UI/BorderedButton";
import {useAppSelector} from "../../HOOK";
import {IAddAdminButton} from "./Types.ts";
import ModalWindow from "../../UI/ModalWindow";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import WaveButton from "../../UI/WaveButton";
import CheckMark from "../../UI/CheckMark";

const ProfileAddAdminButton: FC<IAddAdminButton> = ({userPage, id, setUser}) => {

	const currentUser = useAppSelector(state => state.user),
		[OpenState, setOpenState] = useState<boolean>(false)

	const changeAminRights = (adm: 'canBanUsers' | 'addAdmin' | 'addNews') => {
		updateDoc(doc(db, "Users", id), {
			[adm]: !userPage[adm]
		})
			.then(() => setUser({...userPage, [adm]: !userPage[adm]}))
	}

	if(currentUser.addAdmin) return (
		<>
			<BorderedButton BGColor="green" color="white"
				click={() => setOpenState(prev => !prev)}>
				Изменить права администратора
			</BorderedButton>

			<ModalWindow width={50} openState={OpenState} bgClick={() => setOpenState(false)}>
				<ul className={styles.adminRightsWrapper}>
					<li>
						<p>Право добавлять/удалять администраторов</p>
						<CheckMark check={userPage.addAdmin} change={() => changeAminRights('addAdmin')}/>
					</li>
					<li>
						<p>Право добавлять новости</p>
						<CheckMark check={userPage.addNews} change={() => changeAminRights('addNews')}/>
					</li>
					<li>
						<p>Право банить других пользователей</p>
						<CheckMark check={userPage.canBanUsers} change={() => changeAminRights('canBanUsers')}/>
					</li>
				</ul>
				<div style={{display: 'grid', placeItems: 'center', width: '100%', height: '50px'}}>
					<WaveButton color="#4487a2" onclick={() => setOpenState(false)}>Закрыть</WaveButton>
				</div>
			</ModalWindow>
		</>
	)
}

export default ProfileAddAdminButton
