import {LoadingUserProfile} from "./PAGE/UserProfile";
import {LoadingMessages} from "./PAGE/Messages";
import Contacts from "./PAGE/Contacts";
import {lazy, Suspense} from "react";
import {createBrowserRouter} from "react-router-dom";
import App from './APP'
import {LoadingNews} from "./PAGE/News";
import {LoadingAuth} from "./PAGE/Authentication";
import ErrorDefaultComponent from "./MODULE/ErrorDefaultComponent";
import {LoadingMessagesDialogWindow} from "./MODULE/MessagesDialogWindow";
import {LoadingSettings} from "./PAGE/Settings";

const Messages = lazy(() => import("./PAGE/Messages"))
const News = lazy(() => import("./PAGE/News"))
const Settings = lazy(() => import("./PAGE/Settings"))
const NotFound = lazy(() => import("./PAGE/NotFound"))
const Authentication = lazy(() => import("./PAGE/Authentication"))
const UserProfile = lazy(() => import("./PAGE/UserProfile"))
const UserProfileError = lazy(() => import("./PAGE/UserProfileError"))

const RegisterForm = lazy(() => import("./MODULE/RegisterForm"))
const LoginForm = lazy(() => import("./MODULE/LoginForm"))
const SettingsBasic = lazy(() => import("./MODULE/SettingsBasic"))
const SettingsSafety = lazy(() => import("./MODULE/SettingsSafety"))
const ResetPassword = lazy(() => import("./MODULE/ResetPassword"))
const ContactsList = lazy(() => import("./MODULE/ContactsList"))
const ContactsAccept = lazy(() => import("./MODULE/ContactsAccept"))
const SettingsPrivacy = lazy(() => import("./MODULE/SettingsPrivacy"))
const MessagesDialogWindow = lazy(() => import("./MODULE/MessagesDialogWindow"))
const ContactsBanList = lazy(() => import("./MODULE/ContactsBanList"))

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/profile/:id",
                element: <Suspense fallback={<LoadingUserProfile/>}><UserProfile/></Suspense>,
                errorElement: <UserProfileError/>
            },
            {
                path: "/messages",
                element: <Suspense fallback={<LoadingMessages/>}><Messages /></Suspense>,
                errorElement: <ErrorDefaultComponent type="settingsBlock"/>,
                children: [
                    {
                        path: "/messages/:id",
                        element: <Suspense fallback={<LoadingMessagesDialogWindow/>}><MessagesDialogWindow/></Suspense>,
                    }
                ]
            },
            {
                path: "/news",
                element: <Suspense fallback={<LoadingNews/>}><News /></Suspense>,
                errorElement: <ErrorDefaultComponent type="TransparentBlock"/>,
            },
            {
                path: "/contacts",
                element: <Contacts />,
                errorElement: <ErrorDefaultComponent type="settingsBlock"/>,
                children: [
                    {
                        path: "/contacts/list",
                        element: <Suspense fallback={<></>}><ContactsList /></Suspense>,
                    },
                    {
                        path: "/contacts/accept",
                        element: <Suspense fallback={<></>}><ContactsAccept /></Suspense>,
                    },
                    {
                        path: "/contacts/ban",
                        element: <Suspense fallback={<></>}><ContactsBanList /></Suspense>,
                    },
                ]
            },
            {
                path: "/settings",
                element: <Suspense fallback={<LoadingSettings/>}><Settings /></Suspense>,
                errorElement: <ErrorDefaultComponent type="settingsBlock"/>,
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
        element: <Suspense fallback={<LoadingAuth/>}><Authentication /></Suspense>,
        errorElement: <h2>Ошибка</h2>,
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
