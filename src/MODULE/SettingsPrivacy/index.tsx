import styles from './SettingsPrivacy.module.sass'
import { FC } from 'react'
import SettingsSwitchBlock from "../../ENTITY/SettingsSwitchBlock";
import {useAppDispatch, useAppSelector} from "../../HOOK";
import {ChangeParam} from "./Functions.tsx";

const SettingsPrivacy: FC = () => {

	const user = useAppSelector(state => state.user),
		dispatcher = useAppDispatch()

	return (
		<div className={styles.PrivacyContent}>
			<SettingsSwitchBlock
				title={`${user.settings.canAddToFriends ? "Запретить" : "Разрешить"} добавлять себя в друзья`}
				action={() => ChangeParam(user.uid, {
					canAddToFriends: !user.settings.canAddToFriends,
					canOtherMessage: user.settings.canOtherMessage,
					canOtherSeePosts: user.settings.canOtherSeePosts
				}, dispatcher)}
				dopText={`Сейчас другие пользователи ${user.settings.canAddToFriends ? "" : "не"} могут добавлять вас в контакты`}/>
			<SettingsSwitchBlock
				title={`${user.settings.canOtherMessage ? "Запретить" : "Разрешить"} начинать диалог со мной`}
				action={() => ChangeParam(user.uid, {
					canAddToFriends: user.settings.canAddToFriends,
					canOtherMessage: !user.settings.canOtherMessage,
					canOtherSeePosts: user.settings.canOtherSeePosts
				}, dispatcher)}
				dopText={`Сейчас ${user.settings.canOtherMessage ? "все" : "только пользователи из контактов"} могут начинать начинать с вами диалог`}/>
			<SettingsSwitchBlock
				title={`${user.settings.canOtherSeePosts ? "Скрыть" : "Показать"} посты`}
				action={() => ChangeParam(user.uid, {
					canAddToFriends: user.settings.canAddToFriends,
					canOtherMessage: user.settings.canOtherMessage,
					canOtherSeePosts: !user.settings.canOtherSeePosts
				}, dispatcher)}
				dopText={`Сейчас неизвестные пользователи ${user.settings.canOtherSeePosts ? "" : "не"} могут увидеть ваши посты`}/>
		</div>
	)
}

export default SettingsPrivacy
