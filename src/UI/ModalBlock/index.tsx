import styles from './ModalBlock.module.sass'
import { FC } from 'react'
import {IModalBlock} from "./Types.ts";
import {AnimatePresence, motion} from "framer-motion";

const ModalBlock: FC<IModalBlock> = ({children, dopClass, openState, ...props}) => {

	const variant = {
		animate: {y: 0, opacity: 1},
		initial: {y: -10, opacity: .6},
		exit: {y: -10, opacity: 0}
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
