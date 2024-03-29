import BorderedButton from "../../UI/BorderedButton";
import {useAppSelector, useLocaleDate} from "../../HOOK";
import {FC} from "react";
import {IAcceptDenyButton} from "./Types.ts";
import {useAddToListMutation} from "../../STORE/firebaseAPI2.ts";
import {CancelAccept} from "./Functions.ts";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";
import {useCreateNotificationMutation} from "../../STORE/firebaseApi.ts";

const CancelButton: FC<IAcceptDenyButton> = ({id, PageUserLists}) => {

    const userSelector = useAppSelector(state => state.user),
        [changeParam] = useAddToListMutation(),
        getDate = useLocaleDate(),
		[createNotifServer] = useCreateNotificationMutation()


    return (
        <BorderedButton
            BGColor="var(--redColor)"
            color="#fff"
            click={() => {
                if(PageUserLists) CancelAccept(userSelector, changeParam, id, PageUserLists, createNotifServer, getDate)
                else {
                    getDoc(doc(db, "Lists", id))
                        .then(response => {
                            CancelAccept(userSelector, changeParam, id, {
                                acceptTo: response.data()?.acceptList,
                                friends: response.data()?.friendList,
                                banList: response.data()?.banList
                            }, createNotifServer, getDate)
                        })
                }
            }}>
            Отменить заявку
        </BorderedButton>
    )
}
export default CancelButton