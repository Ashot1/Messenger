import {signOut} from "firebase/auth";
import {auth, db} from "../../firebaseInit.ts";
import {doc, updateDoc} from "firebase/firestore";
import {UserInitialType} from "../../STORE";

export const SignOut = () => {
    signOut(auth)
        .then(() => window.location.reload())
        .catch((e) => alert(e))
}

export const deleteNotification = async (notif: {text: string, createAt: string, icon: string}, user: UserInitialType) => {
    if(!user?.uid) return
    await updateDoc(doc(db, "Notifications", user.uid), {
        notifications: user.notifications.filter(notification => notification !== notif)
    })
}

export const clearNotifications = async (user: UserInitialType) => {
    if(!user?.uid) return
    await updateDoc(doc(db, "Notifications", user.uid), {
        notifications: []
    })
}
