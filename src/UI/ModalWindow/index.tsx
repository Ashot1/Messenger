import styles from './ModalWindow.module.sass'
import { FC } from 'react'
import {createPortal} from "react-dom";
import {IModalWindow} from "./Types.ts";
import {AnimatePresence, motion} from "framer-motion";

const ModalWindow: FC<IModalWindow> = ({width, children, bgClick, openState, ...props}) => {
	const modalRoot = document.querySelector('#modal')

	const variantForBG = {
		initial: {opacity: 0},
		animate: {opacity: 1},
	}

	if(modalRoot) return (
		createPortal(
			<AnimatePresence>
				{openState && <motion.div className={styles.Background} onClick={bgClick} variants={variantForBG}
										  animate="animate" exit="initial" initial="initial">
					<div className={styles.content} style={{width: `clamp(300px, ${width}%, 700px)`}} {...props}
						 onClick={e => e.stopPropagation()}>
						{children}
					</div>
				</motion.div>}
			</AnimatePresence>
			, modalRoot)
	)
}

export default ModalWindow
