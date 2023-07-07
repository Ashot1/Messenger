/*
import PromiseNotification from "../../UI/PromiseNotification";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import {AppDispatch, UserInitialType} from "../../STORE";
import {
    addToAcceptListFromThisUser, addToFriendList, deleteFromAcceptList,
    deleteFromAcceptListFromThisUser,
    deleteFromFriendList
} from "../../STORE/userSlice.ts";

type params = {
    id: string,
    dispatcher: AppDispatch,
    userSelector: UserInitialType
}

const addToFriends = ({id, dispatcher, userSelector}: params) => {
    if(!userSelector.acceptListFromThisUser || !userSelector.friendList) return
    PromiseNotification({
        mainFunction: () => {
            return getDoc(doc(db, "Users", id))
                .then(response => {
                    return updateDoc(doc(db, "Users", id), {
                        acceptList: [...response.data()?.acceptList, `${userSelector.uid}`]
                    })
                })
        },
        successFunction: () => <b>Заявка отправлена</b>
    }).then(() => dispatcher(addToAcceptListFromThisUser({id: id})))
}
const cancelFriendAccept = ({id, dispatcher, userSelector}: params) => {
    PromiseNotification({
        mainFunction: () => {
            return getDoc(doc(db, "Users", id))
                .then(response => {
                    return updateDoc(doc(db, "Users", id), {
                        acceptList: response.data()?.acceptList.filter((item: string) => item !== userSelector.uid)
                    })
                })
        },
        successFunction: () => <b>Заявка отменена</b>
    }).then(() => dispatcher(deleteFromAcceptListFromThisUser({id: id})))
}
const deleteFromFriendsProfile =({id, dispatcher, userSelector}: params) => {
    PromiseNotification({
        mainFunction: () => {
            return getDoc(doc(db, "Users", id))
                .then(response => {
                    return updateDoc(doc(db, "Users", id), {
                        friendList: response.data()?.friendList.filter((item: string) => item !== userSelector.uid)
                    })
                        .then(() => {
                            if(userSelector.uid) return updateDoc(doc(db, "Users", userSelector.uid), {
                                friendList: userSelector.friendList.filter(item => item !== id)
                            })
                        })
                })
        },
        successFunction: () => <b>Пользователь удален из списка контактов</b>
    }).then(() => dispatcher(deleteFromFriendList({id: id})))
}
const acceptFriendProfile = ({id, dispatcher, userSelector}: params) => {
    PromiseNotification({
        mainFunction: () => {
            return getDoc(doc(db, "Users", id))
                .then(response => {
                    return updateDoc(doc(db, "Users", id), {
                        friendList: response.data()?.friendList.concat(userSelector.uid),
                        acceptList: response.data()?.acceptList.filter((item: string) => item !== userSelector.uid)
                    })
                        .then(() => {
                            if(userSelector.uid) return updateDoc(doc(db, "Users", userSelector.uid), {
                                friendList: userSelector.friendList.concat(id),
                                acceptList: userSelector.acceptList.filter((item: string) => item !== id)
                            })
                        })
                })
        },
        successFunction: () => <b>Заявка принята</b>
    }).then(() => {
        dispatcher(addToFriendList({id: id}))
        dispatcher(deleteFromAcceptList({id: id}))
        dispatcher(deleteFromAcceptListFromThisUser({id: id}))
    })
}
const rejectFriendProfile = ({id, dispatcher, userSelector}: params) => {
    PromiseNotification({
        mainFunction: () => {
            if(!userSelector.uid) return Promise.reject(new Error('Пользователь не найден'))
            return updateDoc(doc(db, "Users", userSelector.uid), {
                acceptList: userSelector.acceptList.filter((item: string) => item !== id)
            })
        },
        successFunction: () => <b>Заявка отклонена</b>
    }).then(() => dispatcher(deleteFromAcceptList({id: id})))
}*/
