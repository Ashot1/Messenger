import styles from './Settings.module.sass'
import SettingsHeader from "../../MODULE/SettingsHeader";
import FullUserInfo from "../../ENTITY/FullUserInfo";
import SettingsDefaultBlock from "../../UI/SettingsDefaultBlock";

const LoadingSettings = () => {
    return (
        <div className={styles.Settings}>
            <div className={styles.content}>
                <SettingsHeader/>
                <div style={{width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '25px'}}>
                    {location.pathname === '/settings/main' &&
                        <FullUserInfo
                        lastSignIn="04.07.2023, 06:33:24"
                        createdAt="04.07.2023, 06:33:24"
                        signMethod="google.com"
                        adminRights="наивысшие"
                        email="tltmin@mail.gg"
                        dopClass={styles.Loading}/>}

                    <SettingsDefaultBlock dopClass={styles.Loading}>
                            <p>Загрузка</p>
                    </SettingsDefaultBlock>

                    <SettingsDefaultBlock dopClass={styles.Loading}>
                            <p>Загрузка</p>
                    </SettingsDefaultBlock>

                    <SettingsDefaultBlock dopClass={styles.Loading}>
                            <p>Загрузка</p>
                    </SettingsDefaultBlock>

                </div>
            </div>
        </div>
    )
}

export default LoadingSettings