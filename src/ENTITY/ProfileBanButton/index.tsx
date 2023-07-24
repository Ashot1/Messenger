// import styles from './ProfileBanButton.module.sass'
import { FC } from 'react'
import BorderedButton from "../../UI/BorderedButton";
import {useAppSelector, useLocaleDate} from "../../HOOK";
import {IBanButton} from "./Types.ts";
import {useAddToListMutation} from "../../STORE/firebaseAPI2.ts";
import {AdminBanUser, BasicBanForUser, BasicUnBanForUser} from "./Functions.tsx";

const ProfileBanButton: FC<IBanButton> = ({PageUserLists, id, userBanState}) => {

	const CurrentUser = useAppSelector(state => state.user),
		[changeParam] = useAddToListMutation(),
		getDate = useLocaleDate()

	const banCondition = CurrentUser.banList.includes(id)

	if(id !== CurrentUser.uid) return (
		<>
			{!banCondition &&
				<BorderedButton
					BGColor="var(--redColor)"
					color="#fff"
					reversed
					click={() => BasicBanForUser({
						id: id,
						getDate: getDate,
						changeParam: changeParam,
						PageUserLists: PageUserLists,
						currentUser: CurrentUser
					})}>
					Заблокировать
				</BorderedButton>}

			{banCondition &&
				<BorderedButton
					BGColor="var(--redColor)"
					color="#fff"
					reversed
					click={() => BasicUnBanForUser({
						id: id,
						changeParam: changeParam,
						currentUser: CurrentUser
					})}>
					Разблокировать
				</BorderedButton>}

			{userBanState
				? CurrentUser.canBanUsers &&
				<BorderedButton
					BGColor="var(--redColor)"
					color="#fff"
					reversed
					click={() => AdminBanUser({state: 'unban', id: id})}>
					Разблокировать (Админ)
				</BorderedButton>

				: CurrentUser.canBanUsers &&
				<BorderedButton
					BGColor="var(--redColor)"
					color="#fff"
					reversed
					click={() => AdminBanUser({state: 'ban', id: id})}>
					Заблокировать (Админ)
				</BorderedButton>
			}
		</>
	)
}

export default ProfileBanButton
