import {useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth, db} from "./firebaseInit.ts";
import {
    changeAcceptFromList,
    changeAdminRights,
    changeLists, changeNotifications, changePosts, changeSettings,
    changeUser, stopLoading,
} from "./STORE/userSlice.ts";
import {AppDispatch} from "./STORE";
import {collection, doc, getDoc, onSnapshot, query, where} from "firebase/firestore";

export const UserChecker = (dispatcher: AppDispatch) => useEffect(() => {

    const Unsubscribe = onAuthStateChanged(auth, async user => {
        if(!auth.currentUser?.uid) return dispatcher(stopLoading('loadingInfo'))

        const docRef = doc(db, "Users", auth.currentUser.uid)
        const document = await getDoc(docRef)

        const UserData = document.data()

        if(!UserData) return dispatcher(stopLoading('loadingInfo'))

        const saveUser = (photo: string | null) => {
            dispatcher(changeUser(
                {userEmail: user?.email, userDisplayName: UserData.name, userPhoto: photo, tag: UserData.tag, uid: document.id}
            ))
            dispatcher(changeAdminRights({addAdmin: UserData.addAdmin, addNews: UserData.addNews, ban: UserData.ban}))
            dispatcher(changeSettings({settings: UserData.profileSettings}))
            dispatcher(stopLoading('loadingInfo'))

            dispatcher(changePosts({posts: UserData.posts}))
            dispatcher(stopLoading('loadingPosts'))
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

export const UserListFromChecker= (id: string | undefined, dispatcher: AppDispatch) => useEffect(() => {
    if(!id) return
    const q = query(collection(db, "Lists"), where("acceptList", "array-contains", id))

    const Unsubscribe = onSnapshot(q, (shot) => {
        const list = shot.docs.map(doc => doc.id)

        dispatcher(changeAcceptFromList({acceptListFrom: list}))

        dispatcher(stopLoading('loadingAcceptFrom'))

    }, (err) => console.log(err))

    return () => Unsubscribe()
}, [dispatcher, id])


export const UserListAnotherChecker = (id: string | undefined, dispatcher: AppDispatch) => useEffect(() => {
    if(!id) return
    const Unsubscribe = onSnapshot(doc(db, "Lists", id), (shot) => {

        dispatcher(changeLists({acceptListTo: shot.data()?.acceptList, friendList: shot.data()?.friendList, banList: shot.data()?.banList}))

        dispatcher(stopLoading('loadingLists'))

    }, (err) => console.log(err))

    return () => Unsubscribe()
}, [dispatcher, id])

export const UserNotificationsChecker = (id: string | undefined, dispatcher: AppDispatch) => useEffect(() => {
    if(!id) return
    const Unsubscribe = onSnapshot(doc(db, "Notifications", id), (shot) => {

        dispatcher(changeNotifications({notifications: shot.data()?.notifications}))

        dispatcher(stopLoading('loadingNotifications'))

    }, (err) => console.log(err))

    return () => Unsubscribe()
}, [dispatcher, id])