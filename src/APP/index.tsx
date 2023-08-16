import {FC, Fragment, useMemo} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import styles from "./App.module.sass"
import AsideMenu from "../MODULE/AsideMenu";
import Header from "../MODULE/Header";
import Main from "../MODULE/Main";
import MessagesPhoto from "../ASSET/icon-messages.png";
import FriendsPhoto from "../ASSET/icon-friends.png";
import NewsPhoto from "../ASSET/icon-news.png";
import SettingsPhoto from "../ASSET/icon-setting.png";
import NotFoundPhoto from "../ASSET/icon-notfound.png";
import ProfilePhoto from "../ASSET/icon-profile.png";
import {
    UserChecker,
    UserListAnotherChecker,
    UserListFromChecker,
    UserMessagesChecker,
    UserNotificationsChecker
} from "../UserChecker.ts";
import {useAppDispatch, useAppSelector} from "../HOOK";
import {ThemeChecker} from "./ThemeChecker.ts";


const App: FC = () => {

    const location = useLocation(),
        dispatcher = useAppDispatch(),
        UserSelector = useAppSelector(state => state.user),
        menuStyle = localStorage.getItem('menuStyle')

    UserChecker(dispatcher)

    UserListFromChecker(UserSelector.uid, dispatcher)
    UserListAnotherChecker(UserSelector.uid, dispatcher)
    UserNotificationsChecker(UserSelector, dispatcher)
    UserMessagesChecker(UserSelector.uid, dispatcher)

    // Notification.requestPermission()

    ThemeChecker()

    const PageList = useMemo(() => [
        {url: '/news', icon: NewsPhoto, alt: 'Обновления'},
        {url: '/messages', icon: MessagesPhoto, alt: 'Сообщения'},
        {url: '/contacts', icon: FriendsPhoto, alt: 'Контакты'},
        {url: `/profile/${UserSelector.uid}`, icon: ProfilePhoto, alt: 'Профиль'},
        {url: '/settings', icon: SettingsPhoto, alt: 'Настройки'},
        {url: '/notfound', icon: NotFoundPhoto, alt: 'Страница не найдена'},
        {url: '/profile', icon: ProfilePhoto, alt: 'Профиль'},
    ], [UserSelector.uid])

    if (!UserSelector.loading.loadingInfo && !UserSelector.userEmail) return <Navigate to="/auth/login"/>

    if (location.pathname === '/' && UserSelector.userEmail) return <Navigate to="/news"/>

    return (
        <div className={`${styles.app} ${menuStyle === 'bottom' && styles.appMobileBottomMenu}`}>
            <AsideMenu PageList={PageList.slice(0, -3)}/>

            <section className={styles.rightside}>
                <Header>
                    {PageList.map(page => {
                        if (page.url === `/profile/${UserSelector.uid}`) return
                        if (location.pathname.includes(page.url)) {
                            return (<Fragment key={`${page.url}header`}>
                                <img className={styles.HeaderIcon} src={page.icon} alt={page.alt}/>
                                <h2 className={styles.HeaderTitle}>
                                    {page.alt}
                                </h2>
                            </Fragment>)
                        }
                    })}
                </Header>
                <Main>
                    <Outlet/>
                </Main>
            </section>
        </div>
    );
};

export default App;