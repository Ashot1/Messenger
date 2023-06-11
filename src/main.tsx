import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './APP'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './main.sass'
import Messages from "./PAGE/Messages";
import Contacts from "./PAGE/Contacts";
import News from "./PAGE/News";
import {Provider} from "react-redux";
import store from './STORE'
import Settings from "./PAGE/Settings";
import NotFound from "./PAGE/NotFound";

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
    }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
