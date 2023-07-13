import CustomNotification from "../../UI/CustomNotification";
import {UserInitialType} from "../../STORE";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";

export const deleteContact = (userSelector: UserInitialType, changeParam: any, id: string, PageUser: {friends: string[], acceptTo: string[]}) => {
    if(!userSelector.uid) return
    try {
        changeParam({
            id: userSelector.uid,
            massive: 'friendList',
            values: userSelector.friendList.filter(item => item !== id).map(guy => ({stringValue: guy}))
        })
        changeParam({
            id: id,
            massive: 'friendList',
            values: PageUser.friends.filter(item => item !== userSelector.uid).map(guy => ({stringValue: guy}))
        })
        CustomNotification('Пользователь удален из контактов')
    } catch (err) {
        CustomNotification(`Ошибка: ${err}`, 'error')
    }
}

export const createNotifServer = ({toId, getDate, text, fromPhoto}: {toId: string, getDate: (item: string) => string, text: string, fromPhoto: string | undefined}) => {
    getDoc(doc(db, "Notifications", toId))
        .then((response) => {
            const date = new Date()
            updateDoc(doc(db, "Notifications", toId), {
                notifications: [...response.data()?.notifications,
                    {text: text,
                        createAt: getDate(date.toString()), icon: fromPhoto || ''}]
            })
        })
}