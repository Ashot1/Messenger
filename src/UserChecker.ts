import {useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth, db} from "./firebaseInit.ts";
import {changeAdminRights, changeUser, stopLoading} from "./STORE/userSlice.ts";
import {AppDispatch} from "./STORE";
import { doc, getDoc } from "firebase/firestore";

export const UserChecker = (dispatcher: AppDispatch) => useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async user => {
        if(!auth.currentUser?.uid) return dispatcher(stopLoading())

        const docRef = doc(db, "AdminRights", auth.currentUser.uid)
        const document = await getDoc(docRef)

        const AdminRights = document.data()

        const saveUser = (photo: string | null) => {
            dispatcher(changeUser({userEmail: user?.email, userDisplayName: user?.displayName, userPhoto: photo}))
            if(AdminRights) {
                dispatcher(changeAdminRights({addDeleteAdm: AdminRights.AddDeleteAdm, addNews: AdminRights.AddNews}))
            }
        }

        if(user?.photoURL){
            let img = new Image()
            img.src = user.photoURL
            img.onload = () => {
                saveUser(user.photoURL)
                return
            }
        }
        saveUser('')
    })
    return () => Unsubscribe()
}, [dispatcher])
