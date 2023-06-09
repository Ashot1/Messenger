import {FC} from "react";
import {Outlet} from "react-router-dom";
import styles from "./app.module.sass"

const App: FC = () => {

    return (
        <main className={styles.main}>
            <Outlet/>
        </main>
    );
};

export default App;