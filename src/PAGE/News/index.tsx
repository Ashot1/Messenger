import styles from './News.module.sass'
import { FC } from 'react'
import NewsBlock from "../../ENTITY/NewsBlock";
import {useGetNewsQuery} from "../../STORE/firebaseApi.ts";
import CreateNews from "../../MODULE/CreateNews";

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
				{data?.map(news => (
					<NewsBlock key={news.title} title={news.title} content={news.content} createAt={news.createAt}/>
				))}
			</div>
		</div>
	)
}

export default News
