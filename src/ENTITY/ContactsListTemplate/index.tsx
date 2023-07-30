import styles from './ContactsListTemplate.module.sass'
import {FC} from 'react'
import {IContactsLIstTemplate} from "./Types.ts";
import {Link} from "react-router-dom";
import UserData from "../../UI/UserData";
import {AcceptDenyButtons, CancelButton} from "../ProfileFriendButtons";
import BorderedButton from "../../UI/BorderedButton";
import {useAppSelector, useLocaleDate} from "../../HOOK";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import CustomNotification from "../../UI/CustomNotification";
import {useCreateNotificationMutation} from "../../STORE/firebaseApi.ts";
import {CancelAccept} from "../ProfileFriendButtons/Functions.ts";
import {useAddToListMutation} from "../../STORE/firebaseAPI2.ts";

const ContactsListTemplate: FC<IContactsLIstTemplate> = ({
                                                             children,
                                                             data,
                                                             loading,
                                                             type
                                                         }) => {

    const user = useAppSelector(state => state.user),
        [createNotifServer] = useCreateNotificationMutation(),
        getDate = useLocaleDate(),
        [changeParam] = useAddToListMutation()

    const denyAll = () => {
        if (!user.uid || user.acceptListTo.length <= 0) return
        const accepts = user.acceptListTo

        updateDoc(doc(db, "Lists", user.uid), {
            acceptList: []
        })
            .then(() => {
                accepts.forEach(accept => {
                    createNotifServer({
                        toId: accept,
                        url: `/profile/${accept}`,
                        getDate: getDate,
                        text: `${user.userDisplayName} отклонил вашу заявку в контакты`,
                        fromPhoto: user.userPhoto
                    })
                })
                CustomNotification(`Все заявки отклонены`)
            })
    }

    const cancelAll = () => {
        if (user.acceptListFrom.length <= 0) return
        user.acceptListFrom.forEach(userAcceptFrom => {
            getDoc(doc(db, "Lists", userAcceptFrom))
                .then(response => {
                    CancelAccept(user, changeParam, userAcceptFrom, {
                        acceptTo: response.data()?.acceptList,
                        friends: response.data()?.friendList,
                        banList: response.data()?.banList
                    }, createNotifServer, getDate, false)
                })
        })
        CustomNotification(`Все заявки отменены`)
    }

    return (
        <section className={styles.section}>
            <div style={{display: 'flex', alignItems: 'center', gap: '25px'}}>
                <h1>{children}</h1>
                <BorderedButton reversed
                                BGColor="var(--MainColor)"
                                color="var(--InvertMainColor)"
                                click={type === 'acceptTo' ? denyAll : cancelAll}>{type === 'acceptTo' ? 'Отклонить все' : 'Отменить все'}</BorderedButton>
            </div>
            {
                data.length < 1 && <p className={styles.ClearText}>
					Список пуст
				</p>
            }
            <ul>
                {data.map(item => (
                    <li key={item.tag}>
                        <div className={styles.UserInfo}>
                            <Link to={`/profile/${item.uid}`} className={styles.UserLink}>
                                <UserData
                                    photo={item.photo}
                                    name={item.name}
                                    secondaryText={item.tag}
                                    loading={loading}
                                    logoDopClass={styles.AvatarList}
                                    TextDopClass={styles.TextDataList}/>
                            </Link>
                            <div className={styles.actions}>
                                {type === "acceptTo" && <AcceptDenyButtons id={item.uid}/>}
                                {type === "acceptFrom" && <CancelButton id={item.uid}/>}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ContactsListTemplate