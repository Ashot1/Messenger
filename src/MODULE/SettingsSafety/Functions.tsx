import PromiseNotification from "../../UI/PromiseNotification";
import {sendEmailVerification, sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../../firebaseInit.ts";

export const SendVerifyMessage = () => {
    return PromiseNotification({
        mainFunction: async () => {
            if(!auth.currentUser) return Promise.reject(new Error('Пользователь не найден'))
            return sendEmailVerification(auth.currentUser)
        },
        successFunction: () => <b>Письмо отправлено</b>
    })
}

export const ChangePassword = () => {
    return PromiseNotification({
        mainFunction: async () => {
            if(!auth.currentUser) return Promise.reject(new Error('Пользователь не найден'))
            if(!auth.currentUser.email) return Promise.reject(new Error('Почта не найдена'))
            return sendPasswordResetEmail(auth, auth.currentUser.email)
        },
        successFunction: () => <b>Письмо отправлено</b>
    })
}