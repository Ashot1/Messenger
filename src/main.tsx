import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import store from './STORE'
import './main.sass'
import './firebaseInit.ts'
import {Toaster} from "react-hot-toast";
import {router} from "./Router.tsx";


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
