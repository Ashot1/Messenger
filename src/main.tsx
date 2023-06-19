import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {lazy, StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './APP'
import store from './STORE'
import './main.sass'
import './firebaseInit.ts'
import Authentication from "./PAGE/Authentication";
import RegisterForm from "./MODULE/RegisterForm";
import LoginForm from "./MODULE/LoginForm";
const Messages = lazy(() => import("./PAGE/Messages"))
const Contacts = lazy(() => import("./PAGE/Contacts"))
const News = lazy(() => import("./PAGE/News"))
const Settings = lazy(() => import("./PAGE/Settings"))
const NotFound = lazy(() => import("./PAGE/NotFound"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/messages",
                element: <Messages />,
            },
            {
                path: "/contacts",
                element: <Contacts />,
            },
            {
                path: "/news",
                element: <News />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ]
    },
    {
        path: "/auth",
        element: <Authentication />,
        children: [
            {
                path: "/auth/register",
                element: <RegisterForm />,
            },
            {
                path: "/auth/login",
                element: <LoginForm />,
            }
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </StrictMode>,
)
