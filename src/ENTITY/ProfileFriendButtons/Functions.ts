import CustomNotification from "../../UI/CustomNotification";
import {UserInitialType} from "../../STORE";

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