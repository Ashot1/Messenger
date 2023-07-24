import styles from './UserProfile.module.sass'
import ProfileHeader from "../../MODULE/ProfileHeader";

const LoadingUserProfile = () => {
    return (
        <div className={styles.Settings}>
            <div className={styles.content}>
                <ProfileHeader id='' Loading={true} User={undefined} setUser={() => 'lol'} PageUserLists={{friends: [], acceptTo: [], banList: []}}/>
            </div>
        </div>
    )
}

export default LoadingUserProfile