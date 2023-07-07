import {useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth, db} from "./firebaseInit.ts";
import {changeAdminRights, changeUser, stopLoading} from "./STORE/userSlice.ts";
import {AppDispatch} from "./STORE";
import {doc, getDoc} from "firebase/firestore";

export const UserChecker = (dispatcher: AppDispatch) => useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async user => {
        if(!auth.currentUser?.uid) return dispatcher(stopLoading())

        const docRef = doc(db, "Users", auth.currentUser.uid)
        const document = await getDoc(docRef)

        const UserData = document.data()

        if(!UserData) return dispatcher(stopLoading())

        const saveUser = (photo: string | null) => {
            dispatcher(changeUser(
                {userEmail: user?.email, userDisplayName: UserData.name, userPhoto: photo, tag: UserData.tag, uid: document.id}
            ))
            dispatcher(changeAdminRights({addAdmin: UserData.addAdmin, addNews: UserData.addNews, ban: UserData.ban}))

        }

        let img = new Image()
        img.src = UserData.photo
        img.onload = () => {
            saveUser(UserData.photo)
            return
        }

        saveUser(null)
    })
    return () => Unsubscribe()
}, [dispatcher])
