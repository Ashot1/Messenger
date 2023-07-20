import styles from './Messages.module.sass'
import MessagesList from "../../MODULE/MessagesList";

const LoadingMessages = () => {
    return (
        <div className={styles.messages}>
            <div className={styles.content}>
                <MessagesList data={[]} loading/>
            </div>
        </div>
    )
}

export default LoadingMessages