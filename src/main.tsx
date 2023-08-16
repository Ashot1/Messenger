import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import store from './STORE'
import './main.sass'
import './firebaseInit.ts'
import {Toaster} from "react-hot-toast";
import {router} from "./Router.tsx";


const mediaQuery = window.matchMedia("(max-width: 768px)").matches,
    menuStyle = localStorage.getItem('menuStyle')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <Provider store={store}>
            <Toaster
                position={mediaQuery && menuStyle === 'top' ? "bottom-center" : "top-center"}
                reverseOrder={true}
            />
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)
