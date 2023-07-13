import styles from './Authentication.module.sass'
import {FC, useState} from 'react'
import {Navigate, Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../HOOK";
import {UserChecker} from "../../UserChecker.ts";
import LogRegLinks from "../../ENTITY/LogRegLinks";
import OtherAuthMethods from "../../ENTITY/OtherAuthMethods";

const Authentication: FC = () => {

	const user = useAppSelector(state => state.user),
		dispatcher = useAppDispatch(),
		[TagState, setTagState] = useState(false)

	UserChecker(dispatcher)

	if(!user.loading.loadingInfo && user.userEmail) {
		return <Navigate to="/"/>
	}

	return (
		<div className={styles.Wrapper}>
			<div className={styles.content}>
				{!TagState && <Outlet/>}
				{!TagState && <LogRegLinks/>}
				<OtherAuthMethods setTagState={() => setTagState(prev => !prev)} TagState={TagState}/>
			</div>
		</div>
	)
}

export default Authentication
