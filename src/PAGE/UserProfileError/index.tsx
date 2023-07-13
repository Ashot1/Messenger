import styles from './UserProfileError.module.sass'
import {FC} from 'react'
import SettingsInfo from "../../ENTITY/SettingsInfo";
import BorderedButton from "../../UI/BorderedButton";
import {useNavigate} from "react-router-dom";


const UserProfileError: FC = () => {

	const navigate = useNavigate()

	return (
		<div className={styles.Settings}>
			<div className={styles.content}>
				<div className={styles.Wrapper}>
					<SettingsInfo tag="ошибка" photo={undefined} name="Пользователь не найден">
						<BorderedButton click={() => navigate(-1)}>
							Вернуться
						</BorderedButton>
					</SettingsInfo>
				</div>
			</div>
		</div>
	)
}

export default UserProfileError
