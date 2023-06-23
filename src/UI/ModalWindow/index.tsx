import styles from './ModalWindow.module.sass'
import { FC } from 'react'
import {createPortal} from "react-dom";
import {IModalWindow} from "./Types.ts";

const ModalWindow: FC<IModalWindow> = ({width, children, bgClick, ...props}) => {
	const modalRoot = document.querySelector('#modal')

	if(modalRoot) return (
		createPortal(<div className={styles.Background} onClick={bgClick}>
			<div className={styles.content} style={{width: `clamp(300px, ${width}%, 700px)`}} {...props} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>, modalRoot)
	)
}

export default ModalWindow
