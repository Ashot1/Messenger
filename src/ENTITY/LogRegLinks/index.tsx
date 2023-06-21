import styles from './LogRegLinks.module.sass'
import { FC } from 'react'
import CustomButton from "../../UI/CustomButton";

type LinksComponent = {
	dopClass?: string
}

const LogRegLinks: FC<LinksComponent> = ({dopClass}) => {
	return (
		<div className={`${styles.LinksWrapper} ${dopClass}`}>
			<CustomButton isLink url="/auth/login" dopClass={styles.Link} activeClass={styles.active}>Вход</CustomButton>
			<CustomButton isLink url="/auth/register" dopClass={styles.Link} activeClass={styles.active}>Регистрация</CustomButton>
		</div>
	)
}

export default LogRegLinks
