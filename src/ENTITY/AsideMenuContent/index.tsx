import styles from './AsideMenuContent.module.sass'
import {FC} from 'react'
import CustomButton from "../../UI/CustomButton";
import {IASideContent} from "./Types.ts";

const AsideMenuContent: FC<IASideContent> = ({isActive, PageList}) => {


	return (
		<nav className={isActive ? styles.ActiveMenu : styles.Menu}>
			<div className={styles.content}>
				{PageList.map(button => (
					<CustomButton key={`${button.alt}AsideMenu`}
								  isLink={true}
								  url={button.url}
								  dopClass={`${styles.MenuButtons} ${isActive ? styles.fullMenuButton : ''}`}
								  activeClass={styles.ActiveButton}>
						<img src={button.icon} alt={button.alt}/>
						<p className={styles.text} style={{width: isActive ? "auto" : '0px', position: isActive ? 'relative' : 'absolute'}}>{button.alt}</p>
					</CustomButton>
				))}
			</div>
		</nav>
	)
}

export default AsideMenuContent
export type {IASideContent}