import {useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebaseInit.ts";
import {changeUser} from "./STORE/userSlice.ts";
import {AppDispatch} from "./STORE";

export const UserChecker = (dispatcher: AppDispatch) => useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, user => {
        if(user?.photoURL){
            let img = new Image()
            img.src = user.photoURL
            img.onload = () => {
                dispatcher(changeUser({userEmail: user?.email, userDisplayName: user?.displayName, userPhoto: user.photoURL}))
                return
            }

        }
        dispatcher(changeUser({userEmail: user?.email, userDisplayName: user?.displayName, userPhoto: ''}))
    })
    return () => Unsubscribe()
}, [dispatcher])
