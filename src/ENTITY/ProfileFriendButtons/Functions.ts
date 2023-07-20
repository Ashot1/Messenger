import CustomNotification from "../../UI/CustomNotification";
import {listsMutationType, notificationSendType, UserInitialType} from "../../STORE";

export const deleteContact = (userSelector: UserInitialType, changeParam: listsMutationType, id: string, PageUser: {friends: string[], acceptTo: string[]}) => {
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

export const acceptContact = (userSelector: UserInitialType,
                              changeParam: listsMutationType,
                              id: string,
                              PageUser: {friends: string[], acceptTo: string[]},
                              createNotifServer: notificationSendType,
                              getDate: (arg: string) => string) => {
    if(!userSelector.uid) return
    try {
        changeParam({
            id: userSelector.uid,
            massive: 'acceptList',
            values: userSelector.acceptListTo.filter(item => item !== id).map(guy => ({stringValue: guy}))
        })
        changeParam({
            id: id,
            massive: 'acceptList',
            values: PageUser.acceptTo.filter(item => item !== userSelector.uid).map(guy => ({stringValue: guy}))
        })
        changeParam({
            id: userSelector.uid,
            massive: 'friendList',
            values: userSelector.friendList.concat(id).map(guy => ({stringValue: guy}))
        })
        changeParam({
            id: id,
            massive: 'friendList',
            values: PageUser.friends.concat(userSelector.uid).map(guy => ({stringValue: guy}))
        })

        createNotifServer(
            {
                toId: id,
                fromPhoto: userSelector.userPhoto,
                getDate: getDate,
                text: `${userSelector.userDisplayName} принял вашу заявку в контакты`,
                url: ''
            }
        )

        CustomNotification('Пользователь добавлен в контакты')

    } catch (err) {
        CustomNotification(`Ошибка: ${err}`, 'error')
    }
}

export const CancelAccept = (userSelector: UserInitialType, changeParam: listsMutationType, id: string, PageUser: {friends: string[], acceptTo: string[]}) => {
    if(!userSelector.uid) return
    try {
        changeParam({
            id: id,
            massive: 'acceptList',
            values: PageUser.acceptTo.filter(item => item !== userSelector.uid).map(guy => ({stringValue: guy}))
        })
        CustomNotification('Заявка отменена')
    } catch (e) {
        CustomNotification('Ошибка', 'error')
    }
}