import styles from './Authentication.module.sass'
import { FC } from 'react'
import {Link, Navigate, Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../HOOK/ReduxCustomHooks.ts";
import {UserChecker} from "../../UserChecker.ts";

const Authentication: FC = () => {

	const user = useAppSelector(state => state.user),
		dispatcher = useAppDispatch()

	UserChecker(dispatcher)

	if(!user.loading && user.userEmail) return <Navigate to="/"/>

	return (
		<div className={styles.Wrapper}>
			<form autoComplete="on" className={styles.form}>
				<Outlet/>
				<Link to="/auth/login">Войти</Link>
				<Link to="/auth/register">Зарегистрироваться</Link>
			</form>
		</div>
	)
}

export default Authentication
