import styles from './ModalBlock.module.sass'
import { FC } from 'react'
import {IModalBlock} from "./Types.ts";
import { motion } from "framer-motion";

const ModalBlock: FC<IModalBlock> = ({children, dopClass, ...props}) => {
	return (
		<motion.div className={`${styles.Modal} ${dopClass}`} initial={{y: -15, opacity: .6}} animate={{y: 0, opacity: 1}} exit={{y: -15, opacity: 0}} {...props}>
			{children}
		</motion.div>
	)
}

export default ModalBlock
