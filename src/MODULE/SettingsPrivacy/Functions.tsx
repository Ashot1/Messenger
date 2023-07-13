import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import {changeSettings} from "../../STORE/userSlice.ts";
import {AppDispatch} from "../../STORE";
import PromiseNotification from "../../UI/PromiseNotification";

export const ChangeParam = (id: string | undefined, settings: {[key: string]: boolean}, dispatcher: AppDispatch) => {
    PromiseNotification({
        mainFunction: () => {
            if(!id) return Promise.reject(new Error("Пользователь не найден"))
            return updateDoc(doc(db, "Users", id), {
                profileSettings: settings
            })
        },
        successFunction: () => <b>Настройки сохранены</b>
    })
        .then(() =>
            dispatcher(changeSettings({settings: settings}))
        )
}