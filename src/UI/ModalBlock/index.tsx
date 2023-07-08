import styles from './ModalBlock.module.sass'
import { FC } from 'react'
import {IModalBlock} from "./Types.ts";
import {AnimatePresence, motion} from "framer-motion";
import {createPortal} from "react-dom";

const ModalBlock: FC<IModalBlock> = ({children, dopClass, openState, ...props}) => {
	const modalRoot = document.querySelector('#modal')

	const variant = {
		animate: {y: 0, opacity: 1},
		initial: {y: -10, opacity: .6},
		exit: {y: -10, opacity: 0}
	}

	if(modalRoot) return (
		createPortal(
			<AnimatePresence>
				{openState && <motion.div className={`${styles.Modal} ${dopClass}`} variants={variant} initial="initial"
							 animate="animate" exit="exit" {...props}>
					{children}
				</motion.div>}
			</AnimatePresence>
			, modalRoot)
	)
}

export default ModalBlock
