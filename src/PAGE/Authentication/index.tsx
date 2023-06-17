import styles from './Authentication.module.sass'
import { FC } from 'react'
import FormField from "../../ENTITY/FormField";

const Authentication: FC = () => {
	return (
		<div className={styles.Wrapper}>
			<form autoComplete="on" className={styles.form}>
				<FormField title="Имя"/>
				<FormField title="Фамилия"/>

				<label htmlFor="tag">Ваш уникальный тег, по которому вас можно будет найти</label>
				<span>#<input id="tag" type="text" required max="5"/></span>

				<FormField title="Email" type="email"/>

				<FormField title="Пароль" type="password"/>

			</form>
		</div>
	)
}

export default Authentication
