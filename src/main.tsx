import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {lazy, StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './APP'
import store from './STORE'
import './main.sass'
import './firebaseInit.ts'
import {Toaster} from "react-hot-toast";
import UserProfileError from "./PAGE/UserProfileError";

const Messages = lazy(() => import("./PAGE/Messages"))
const Contacts = lazy(() => import("./PAGE/Contacts"))
const News = lazy(() => import("./PAGE/News"))
const Settings = lazy(() => import("./PAGE/Settings"))
const NotFound = lazy(() => import("./PAGE/NotFound"))
const Authentication = lazy(() => import("./PAGE/Authentication"))
const UserProfile = lazy(() => import("./PAGE/UserProfile"))

const RegisterForm = lazy(() => import("./MODULE/RegisterForm"))
const LoginForm = lazy(() => import("./MODULE/LoginForm"))
const SettingsBasic = lazy(() => import("./MODULE/SettingsBasic"))
const SettingsSafety = lazy(() => import("./MODULE/SettingsSafety"))
const ResetPassword = lazy(() => import("./MODULE/ResetPassword"))
const ContactsList = lazy(() => import("./MODULE/ContactsList"))
const ContactsAccept = lazy(() => import("./MODULE/ContactsAccept"))
const SettingsPrivacy = lazy(() => import("./MODULE/SettingsPrivacy"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/profile/:id",
                element: <UserProfile/>,
                errorElement: <UserProfileError/>
            },
            {
                path: "/messages",
                element: <Messages />,
            },
            {
                path: "/news",
                element: <News />,
            },
            {
                path: "/contacts",
                element: <Contacts />,
                children: [
                    {
                        path: "/contacts/list",
                        element: <ContactsList />,
                    },
                    {
                        path: "/contacts/accept",
                        element: <ContactsAccept />,
                    },
                ]
            },
            {
                path: "/settings",
                element: <Settings />,
                children: [
                    {
                        path: "/settings/main",
                        element: <SettingsBasic />,
                    },
                    {
                        path: "/settings/safety",
                        element: <SettingsSafety />,
                    },
                    {
                      path: "/settings/privacy",
                      element: <SettingsPrivacy />,
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
            }
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
