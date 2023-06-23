import styles from './ModalBlock.module.sass'
import { FC } from 'react'
import {IModalBlock} from "./Types.ts";
import { motion } from "framer-motion";
import {createPortal} from "react-dom";

const ModalBlock: FC<IModalBlock> = ({children, dopClass, ...props}) => {
	const modalRoot = document.querySelector('#modal')

	if(modalRoot) return (
		createPortal(<motion.div className={`${styles.Modal} ${dopClass}`} initial={{y: -15, opacity: .6}} animate={{y: 0, opacity: 1}} exit={{y: -15, opacity: 0}} {...props}>
			{children}
		</motion.div>, modalRoot)
	)
}

export default ModalBlock
