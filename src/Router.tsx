import MessagesDialogWindow from "./MODULE/MessagesDialogWindow";
import {LoadingUserProfile} from "./PAGE/UserProfile";
import {LoadingMessages} from "./PAGE/Messages";
import {LoadinContacts} from "./PAGE/Contacts";
import {lazy, Suspense} from "react";
import {createBrowserRouter} from "react-router-dom";
import App from './APP'
import {LoadingNews} from "./PAGE/News";
import {LoadingSettings} from "./PAGE/Settings";
import {LoadingAuth} from "./PAGE/Authentication";

const Messages = lazy(() => import("./PAGE/Messages"))
const Contacts = lazy(() => import("./PAGE/Contacts"))
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
                children: [
                    {
                        path: "/messages/:id",
                        element: <MessagesDialogWindow/>
                    }
                ]
            },
            {
                path: "/news",
                element: <Suspense fallback={<LoadingNews/>}><News /></Suspense>,
            },
            {
                path: "/contacts",
                element:<Suspense fallback={<LoadinContacts/>}><Contacts /></Suspense>,
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
                element: <Suspense fallback={<LoadingSettings/>}><Settings /></Suspense>,
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
