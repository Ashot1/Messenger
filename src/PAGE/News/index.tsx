import styles from './News.module.sass'
import { FC } from 'react'
import NewsBlock from "../../ENTITY/NewsBlock";
import CreateNews from "../../MODULE/CreateNews";
import {useGetNewsQuery} from "../../STORE/firebaseAPI2.ts";

const News: FC = () => {
	const {data, isLoading} = useGetNewsQuery('')

	return (
		<div className={styles.News}>
			<div className={styles.content}>
				<CreateNews/>
				{isLoading && <NewsBlock title="Обновление X.X" content={[
					'Добавлена плавная загрузка данных',
					'Добавлена страница с ',
					'Добавлено отображение ',
					'Добавлена возможно удалить ',
					'Добавлена возможно изменить '
				]} dopClass={styles.loaderNews} createAt="01.07.20203"/>}
				{isLoading && <NewsBlock title="Обновление X.X" content={[
					'Добавлена плавная загрузка данных',
					'Добавлена страница с ',
					'Добавлено отображение ',
					'Добавлена возможно удалить ',
					'Добавлена возможно изменить '
				]} dopClass={styles.loaderNews} createAt="01.07.20203"/>}
				{// @ts-ignore
					data?.documents.toReversed().map((news) => {
						const DBcontent = news.fields.content.arrayValue.values
						let content: string[] = []
						DBcontent.forEach((item: {stringValue: string}) => content.push(item.stringValue))
						return <NewsBlock key={news.fields.title.stringValue} title={news.fields.title.stringValue} content={content} createAt={news.fields.createAt.stringValue}/>
					})}
			</div>
		</div>
	)
}

export default News
