import styles from './Authentication.module.sass'
import { FC } from 'react'
import {Navigate, Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../HOOK/ReduxCustomHooks.ts";
import {UserChecker} from "../../UserChecker.ts";
import LogRegLinks from "../../ENTITY/LogRegLinks";
import OtherAuthMethods from "../../ENTITY/OtherAuthMethods";

const Authentication: FC = () => {

	const user = useAppSelector(state => state.user),
		dispatcher = useAppDispatch()

	UserChecker(dispatcher)

	if(!user.loading && user.userEmail) return <Navigate to="/"/>

	return (
		<div className={styles.Wrapper}>
			<form autoComplete="on" className={styles.form}>
				<Outlet/>
				<LogRegLinks/>
				<OtherAuthMethods/>
			</form>
		</div>
	)
}

export default Authentication
