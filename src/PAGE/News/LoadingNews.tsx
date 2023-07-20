import styles from './News.module.sass'
import CreateNews from "../../MODULE/CreateNews";
import NewsBlock from "../../ENTITY/NewsBlock";

const LoadingNews = () => {
    return (
        <div className={styles.News}>
            <div className={styles.content}>
                <CreateNews/>
                <NewsBlock title="Обновление X.X" content={[
                    'Добавлена плавная загрузка данных',
                    'Добавлена страница с ',
                    'Добавлено отображение ',
                    'Добавлена возможно удалить ',
                    'Добавлена возможно изменить '
                ]} dopClass={styles.loaderNews} createAt="01.07.20203"/>
                <NewsBlock title="Обновление X.X" content={[
                    'Добавлена плавная загрузка данных',
                    'Добавлена страница с ',
                    'Добавлено отображение ',
                    'Добавлена возможно удалить ',
                    'Добавлена возможно изменить '
                ]} dopClass={styles.loaderNews} createAt="01.07.20203"/>
            </div>
        </div>
    )
}
export default LoadingNews