import styles from './News.module.sass'
import { FC } from 'react'
import NewsBlock from "../../ENTITY/NewsBlock";
import {useGetNewsQuery} from "../../STORE/firebaseApi.ts";

const News: FC = () => {
	const {data, isLoading} = useGetNewsQuery('')

	return (
		<div className={styles.News}>
			<div className={styles.content}>
				{isLoading && <NewsBlock title="Обновление X.X" content={[
					'Добавлена плавная загрузка данных',
					'Добавлена страница с информацией об обновлениях',
					'Добавлено отображение версии приложения в настройках',
					'Добавлена возможно удалить автар через отдельное меню в настройках',
					'Добавлена возможно изменить аватар нажатием на него в настройках'
				]} dopClass={styles.loaderNews}/>}
				{data?.map(news => (
					<NewsBlock key={news.title} title={news.title} content={news.content}/>
				))}
			</div>
		</div>
	)
}

export default News
