import styles from './ProfileHeader.module.sass'
import {FC} from 'react'
import SettingsInfo from "../../ENTITY/SettingsInfo";
import {IProfileHeader, UserInfo} from "./Types.ts";
import ProfileFriendButtons from "../../ENTITY/ProfileFriendButtons";
import BorderedButton from "../../UI/BorderedButton";

const ProfileHeader: FC<IProfileHeader> = ({User, Loading, id}) => {

	if(Loading)
		return(
			<div className={styles.Wrapper}>
				<SettingsInfo tag="@12345" photo={undefined} name="Вазген" loading={Loading}>
					<BorderedButton
						BGColor="transparent"
						color="transparent"
						dopClass={styles.LoadingButton}>
						Удалить из контактов
					</BorderedButton>
				</SettingsInfo>
			</div>
		)

	if(User) return (
		<div className={styles.Wrapper}>
			<SettingsInfo tag={`@${User.tag}`} photo={User.photo} name={User.name}>
				<ProfileFriendButtons id={id} User={User}/>
			</SettingsInfo>
		</div>
	)
}

export default ProfileHeader
export type {UserInfo}