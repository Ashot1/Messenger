import {ReactNode} from 'react'
import toast from "react-hot-toast";
import {IPromiseNotification} from "./Types.ts";

const PromiseNotification: (args: IPromiseNotification) => Promise<ReactNode> = ({successFunction, mainFunction}) => {
	return (
		toast.promise(
			mainFunction(),
			{
				loading: 'Обновление...',
				success: successFunction(),
				error: (e: any) => <b>Ошибка: {
					e.message === 'Firebase: Error (auth/requires-recent-login).'
						? 'Перед изменением необходимо перезайти на аккаунт'
						: e.message
				}</b>,
			},
			{style: {background: 'var(--primaryBGcolor)', color: 'var(--MainColor)'}, iconTheme: {primary: '#4487a2', secondary: '#fff'}}
		)
	)
}

export default PromiseNotification
