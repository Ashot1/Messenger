import styles from './Contacts.module.sass'
import Search from "../../UI/Search";
import Menu from "../../ENTITY/Menu";

const LoadinContacts = () => {
    return(
        <div className={styles.Contacts}>
            <div className={styles.content}>
                <form>
                    <Search/>
                </form>
                <Menu content={[{url: '/contacts/list', title: 'Контакты'}, {url: '/contacts/accept', title: 'Заявки'}]}/>
            </div>
        </div>
    )
}
export default LoadinContacts