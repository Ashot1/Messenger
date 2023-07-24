import styles from './ModalBlock.module.sass'
import { FC } from 'react'
import {IModalBlock} from "./Types.ts";
import {AnimatePresence, motion} from "framer-motion";

const ModalBlock: FC<IModalBlock> = ({children, dopClass, openState, ...props}) => {

	const variant = {
		animate: {y: -5, opacity: 1, duration: 20},
		initial: {y: 0, opacity: .9, duration: 20},
		exit: {y: 0, opacity: 0, duration: 20, }
	}

	return (
		<AnimatePresence>
			{openState && <motion.div className={`${styles.Modal} ${dopClass}`} variants={variant} initial="initial"
						 animate="animate" exit="exit" {...props}>
				{children}
			</motion.div>}
		</AnimatePresence>
	)
}

export default ModalBlock
