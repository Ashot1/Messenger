import {FC, Fragment, useEffect, useMemo} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import styles from "./App.module.sass"
import AsideMenu from "../MODULE/AsideMenu";
import Header from "../MODULE/Header";
import MessagesPhoto from "../ASSET/icon-messages.png";
import FriendsPhoto from "../ASSET/icon-friends.png";
import NewsPhoto from "../ASSET/icon-news.png";
import SettingsPhoto from "../ASSET/icon-setting.png";
import NotFoundPhoto from "../ASSET/icon-notfound.png";

const App: FC = () => {

    const theme = localStorage.getItem("theme")
    const location = useLocation()

    const PageList = useMemo(() => [
        {url: '/news', icon: NewsPhoto, alt: 'Обновления'},
        {url: '/messages', icon: MessagesPhoto, alt: 'Сообщения'},
        {url: '/contacts', icon: FriendsPhoto, alt: 'Контакты'},
        {url: '/settings', icon: SettingsPhoto, alt: 'Настройки'},
        {url: '/notfound', icon: NotFoundPhoto, alt: 'Страница не найдена'},
    ], [])

    if(!theme) {
        localStorage.setItem("theme", "darkmode")
        window.location.reload()
    }

    useEffect(() => {
        if(theme) document.documentElement.dataset.theme = theme
    },[theme])

    if(location.pathname === '/') return <Navigate to="/messages"/>

    return (
        <div className={styles.app}>
            <AsideMenu PageList={PageList.slice(0, -2)}/>
            <section className={styles.rightside}>
                <Header>
                    {PageList.map(page => {
                        if(location.pathname.includes(page.url)) {
                            return(<Fragment key={`${page.url}header`}>
                                    <img className={styles.HeaderIcon} src={page.icon} alt={page.alt}/>
                                    <h2 className={styles.HeaderTitle}>
                                        {page.alt}
                                    </h2>
                            </Fragment>)
                        }
                    })}
                </Header>
                <main>
                    <Outlet/>
                </main>
            </section>
        </div>
    );
};

export default App;