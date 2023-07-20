import {FC} from "react";
import {IAcceptDenyButton} from "./Types.ts";
import {useAppSelector, useLocaleDate} from "../../HOOK";
import {useAddToListMutation} from "../../STORE/firebaseAPI2.ts";
import {useCreateNotificationMutation} from "../../STORE/firebaseApi.ts";
import BorderedButton from "../../UI/BorderedButton";
import CustomNotification from "../../UI/CustomNotification";
import {acceptContact} from "./Functions.ts";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";

const AcceptDenyButtons: FC<IAcceptDenyButton> = ({id, PageUser}) => {

    const userSelector = useAppSelector(state => state.user),
        getDate = useLocaleDate(),
        [changeParam] = useAddToListMutation(),
        [createNotifServer] = useCreateNotificationMutation()

    return (
        <>
            <BorderedButton
                BGColor="#4487a2"
                color="#fff"
                click={() => {
                    if(PageUser) acceptContact(userSelector, changeParam, id, PageUser, createNotifServer, getDate)
                    else {
                        getDoc(doc(db, "Lists", id))
                            .then(response => {
                                acceptContact(userSelector, changeParam, id, {
                                    acceptTo: response.data()?.acceptList,
                                    friends: response.data()?.friendList
                                }, createNotifServer, getDate)
                            })
                    }
                }}>
                Принять заявку
            </BorderedButton>
            <BorderedButton
                BGColor="var(--redColor)"
                color="#fff"
                click={() => {
                    try{
                        changeParam({
                            id: userSelector.uid,
                            massive: 'acceptList',
                            values: userSelector.acceptListTo.filter(item => item !== id).map(guy => ({stringValue: guy}))
                        })
                        createNotifServer(
                            {
                                toId: id,
                                fromPhoto: userSelector.userPhoto,
                                getDate: getDate,
                                text: `${userSelector.userDisplayName} отклонил вашу заявку в контакты`,
                                url: ''
                            })
                        CustomNotification('Заявка отклонена')
                    } catch (err) {
                        CustomNotification(`Ошибка: ${err}`, 'error')
                    }
                }
                }>
                Отклонить заявку
            </BorderedButton>
        </>
    )
}

export default AcceptDenyButtons