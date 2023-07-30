import CustomNotification from "../../UI/CustomNotification";
import {listsMutationType, notificationSendType, UserInitialType} from "../../STORE";
import {PageUserType} from "../../MODULE/ProfileHeader";
import {IDeleteFromContactsFunction} from "./Types.ts";

export const deleteContact = ({createNotifServer,
                                  getDate,
                                  id,
                                  PageUserLists,
                                  userSelector,
                                  changeParam}: IDeleteFromContactsFunction) => {

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
            values: PageUserLists.friends.filter(item => item !== userSelector.uid).map(guy => ({stringValue: guy}))
        })
        CustomNotification('Пользователь удален из контактов')

        if(createNotifServer) createNotifServer({
            toId: id,
            fromPhoto: userSelector.userPhoto,
            getDate: getDate,
            text: `${userSelector.userDisplayName} удалил вас из контактов`,
            url: `/profile/${userSelector.uid}`
        })

    } catch (err) {
        CustomNotification(`Ошибка: ${err}`, 'error')
    }
}

export const acceptContact = (userSelector: UserInitialType,
                              changeParam: listsMutationType,
                              id: string,
                              PageUser: PageUserType,
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
                url: '/contacts/list'
            }
        )

        CustomNotification('Пользователь добавлен в контакты')

    } catch (err) {
        CustomNotification(`Ошибка: ${err}`, 'error')
    }
}

export const CancelAccept = (
    userSelector: UserInitialType,
    changeParam: listsMutationType,
    id: string,
    PageUser: PageUserType,
    createNotifServer: notificationSendType,
    getDate: (arg: string) => string,
    needNotif: boolean = true) => {

    if(!userSelector.uid) return
    try {
        changeParam({
            id: id,
            massive: 'acceptList',
            values: PageUser.acceptTo.filter(item => item !== userSelector.uid).map(guy => ({stringValue: guy}))
        })
        createNotifServer(
            {
                toId: id,
                fromPhoto: userSelector.userPhoto,
                getDate: getDate,
                text: `${userSelector.userDisplayName} отменил заявку в контакты`,
                url: `/profile/${userSelector.uid}`
            }
        )
        if(needNotif) CustomNotification('Заявка отменена')
    } catch (e) {
        CustomNotification('Ошибка', 'error')
    }
}