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
import {UserChecker} from "../UserChecker.ts";
import {useAppDispatch, useAppSelector} from "../HOOK/ReduxCustomHooks.ts";
import {ThemeChecker} from "../ThemeChecker.ts";

const App: FC = () => {

    const location = useLocation(),
        dispatcher = useAppDispatch(),
        UserSelector = useAppSelector(state => state.user)

    UserChecker(dispatcher)

    ThemeChecker()

    const PageList = useMemo(() => [
        {url: '/news', icon: NewsPhoto, alt: 'Обновления'},
        {url: '/messages', icon: MessagesPhoto, alt: 'Сообщения'},
        {url: '/contacts', icon: FriendsPhoto, alt: 'Контакты'},
        {url: '/settings', icon: SettingsPhoto, alt: 'Настройки'},
        {url: '/notfound', icon: NotFoundPhoto, alt: 'Страница не найдена'},
    ], [])

    if(!UserSelector.loading && !UserSelector.userEmail) return <Navigate to="/auth/login"/>

    if(location.pathname === '/' && UserSelector.userEmail) return <Navigate to="/messages"/>

    return (
        <div className={styles.app}>
            {UserSelector.userEmail && <AsideMenu PageList={PageList.slice(0, -2)}/>}
            <section className={styles.rightside}>
                {UserSelector.userEmail && <Header>
                    {PageList.map(page => {
                        if (location.pathname.includes(page.url)) {
                            return (<Fragment key={`${page.url}header`}>
                                <img className={styles.HeaderIcon} src={page.icon} alt={page.alt}/>
                                <h2 className={styles.HeaderTitle}>
                                    {page.alt}
                                </h2>
                            </Fragment>)
                        }
                    })}
                </Header>}
                <Main>
                        <Outlet/>
                </Main>
            </section>
        </div>
    );
};

export default App;