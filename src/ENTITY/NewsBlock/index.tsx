import styles from './NewsBlock.module.sass'
import { FC } from 'react'
import TransparentBlock from "../../UI/TransparentBlock";
import {INewsBlock} from "./Types.ts";

const NewsBlock: FC<INewsBlock> = ({title, content, dopClass}) => {
	return (
		<TransparentBlock dopClass={`${styles.NewsBlock} ${dopClass}`}>
			<h1>{title}</h1>
			<ul>
				{content.map((text, index) => (
					<li key={index}>{text}</li>
				))}
			</ul>
		</TransparentBlock>
	)
}

export default NewsBlock
