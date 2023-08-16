import styles from './DropDownMenu.module.sass'
import {FC, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {IDropDownMenu} from "./Types.ts";


const DropDownMenu: FC<IDropDownMenu> = ({list, children, dopClassWrapper, needArrow = true, dopClassList}) => {

    const [OpenState, setOpenState] = useState(false)

    return (
        <button className={`${styles.Wrapper} ${dopClassWrapper}`}
                onBlur={() => setTimeout(() => setOpenState(false), 250)}>
            <div className={`${styles.CurrentText} ${OpenState ? styles.CurrentTextActive : ''}`}
                 onClick={() => setOpenState(prev => !prev)}>
                <div className={styles.TopMenu}>
                    {children}
                    {needArrow &&
						<motion.span animate={{rotate: OpenState ? 0 : 180}} className={styles.Arrow}></motion.span>}
                </div>
            </div>
            <AnimatePresence>
                {OpenState &&
					<motion.div initial={{opacity: 0, translateY: -15}}
					            animate={{opacity: 1, translateY: 0}}
					            exit={{opacity: 0, translateY: -10}}
					            className={`${styles.DropDown} ${dopClassList}`}>
						<ul>
                            {list}
						</ul>
					</motion.div>}
            </AnimatePresence>
        </button>
    )
}

export default DropDownMenu
