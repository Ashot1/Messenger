import BorderedButton from "../../UI/BorderedButton";
import {useAppSelector} from "../../HOOK";
import {FC} from "react";
import {IAcceptDenyButton} from "./Types.ts";
import {useAddToListMutation} from "../../STORE/firebaseAPI2.ts";
import {CancelAccept} from "./Functions.ts";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseInit.ts";

const CancelButton: FC<IAcceptDenyButton> = ({id, PageUser}) => {

    const userSelector = useAppSelector(state => state.user),
        [changeParam] = useAddToListMutation()


    return (
        <BorderedButton
            BGColor="var(--redColor)"
            color="#fff"
            click={() => {
                if(PageUser) CancelAccept(userSelector, changeParam, id, PageUser)
                else {
                    getDoc(doc(db, "Lists", id))
                        .then(response => {
                            CancelAccept(userSelector, changeParam, id, {
                                acceptTo: response.data()?.acceptList,
                                friends: response.data()?.friendList
                            })
                        })
                }
            }}>
            Отменить заявку
        </BorderedButton>
    )
}
export default CancelButton