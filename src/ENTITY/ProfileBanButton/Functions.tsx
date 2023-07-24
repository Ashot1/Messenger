import {deleteContact} from "../ProfileFriendButtons";
import CustomNotification from "../../UI/CustomNotification";
import {IBlockFunction, IUnblockUser} from "./Types.ts";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";

export const BasicBanForUser = ({currentUser, PageUserLists, getDate, id, changeParam}: IBlockFunction) => {
    if(!currentUser?.uid) return

    deleteContact({
        userSelector: currentUser,
        PageUserLists: PageUserLists,
        changeParam: changeParam,
        id: id,
        getDate: getDate,
    })

    changeParam({
        id: currentUser.uid,
        massive: 'banList',
        values: currentUser.banList
            .concat(id)
            .map(user => ({stringValue: user}))
    })

    CustomNotification('Пользователь заблокирован')

}

export const BasicUnBanForUser = ({changeParam, currentUser, id}: IUnblockUser) => {
    changeParam({
        id: currentUser.uid,
        massive: 'banList',
        values: currentUser.banList
            .filter(item => item !== id)
            .map(user => ({stringValue: user}))
    })

    CustomNotification('Пользователь разблокирован')

}

export const AdminBanUser = ({id, state}: {id: string | undefined, state: "ban" | "unban"}) => {
    if(!id) return
    const banState = state === "ban"
    updateDoc(doc(db, "Users", id), {
        ban: banState
    })
        .then(() => {
            CustomNotification(`Пользователь ${banState ? "забанен" : "разбанен"}`)
        })
        .catch(err => console.log(err.message))
}