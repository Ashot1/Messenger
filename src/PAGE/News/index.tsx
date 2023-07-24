import styles from './News.module.sass'
import { FC } from 'react'
import NewsBlock from "../../ENTITY/NewsBlock";
import CreateNews from "../../MODULE/CreateNews";
import {useFormatDate} from "../../HOOK";
import {DocumentData} from "@firebase/firestore-types";
import {useGetNewsQuery} from "../../STORE/newsAPI.ts";
import LoadingNews from "./LoadingNews.tsx"

const News: FC = () => {
	const {data, isLoading, isFetching} = useGetNewsQuery(''),
		DateFormat = useFormatDate()

	return (
		<div className={styles.News}>
			<div className={styles.content}>
				<CreateNews/>
				{isLoading && isFetching && <NewsBlock title="Обновление X.X" content={[
					'Добавлена плавная загрузка данных',
					'Добавлена страница с ',
					'Добавлено отображение ',
					'Добавлена возможно удалить ',
					'Добавлена возможно изменить '
				]} dopClass={styles.loaderNews} createAt="01.07.20203"/>}
				{isLoading && isFetching && <NewsBlock title="Обновление X.X" content={[
					'Добавлена плавная загрузка данных',
					'Добавлена страница с ',
					'Добавлено отображение ',
					'Добавлена возможно удалить ',
					'Добавлена возможно изменить '
				]} dopClass={styles.loaderNews} createAt="01.07.20203"/>}
				{data
					?.documents
					.toSorted((a: DocumentData, b: DocumentData) => (
						new Date(DateFormat(b.fields.createAt.stringValue)).getTime() - new Date(DateFormat(a.fields.createAt.stringValue)).getTime())
					)
					.map((news: DocumentData) => {
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
export {LoadingNews}