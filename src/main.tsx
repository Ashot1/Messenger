import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {lazy, StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './APP'
import store from './STORE'
import './main.sass'
import './firebaseInit.ts'
import {Toaster} from "react-hot-toast";
const Messages = lazy(() => import("./PAGE/Messages"))
const Contacts = lazy(() => import("./PAGE/Contacts"))
const News = lazy(() => import("./PAGE/News"))
const Settings = lazy(() => import("./PAGE/Settings"))
const NotFound = lazy(() => import("./PAGE/NotFound"))
const Authentication = lazy(() => import("./PAGE/Authentication"))
const RegisterForm = lazy(() => import("./MODULE/RegisterForm"))
const LoginForm = lazy(() => import("./MODULE/LoginForm"))
const BasicSettings = lazy(() => import("./MODULE/BasicSettings"))
const Safety = lazy(() => import("./MODULE/Safety"))
const ResetPassword = lazy(() => import("./PAGE/ResetPassword"))

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
                children: [
                    {
                        path: "/settings/main",
                        element: <BasicSettings />,
                    },
                    {
                        path: "/settings/safety",
                        element: <Safety />,
                    },
                ]
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
            },
            {
                path: "/auth/reset",
                element: <ResetPassword />,
            },
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
      <Provider store={store}>
          <Toaster
              position="top-center"
              reverseOrder={true}
          />
          <RouterProvider router={router} />
      </Provider>
  </StrictMode>,
)
