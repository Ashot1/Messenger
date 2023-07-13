import toast from "react-hot-toast";
import PromiseNotification from "../../UI/PromiseNotification";
import {auth, db, FBstorage} from "../../firebaseInit.ts";
import {deleteObject, ref} from "firebase/storage";
import {doc, updateDoc} from "firebase/firestore";
import {changeUser, UserInitialType} from "../../STORE/userSlice.ts";
import {AppDispatch} from "../../STORE";

export const DeleteAvatar = (userSelector: UserInitialType, dispatch: AppDispatch) => {
    if(!userSelector.userPhoto)
        return toast.error("У вас отсутствует фото профиля",
            {style: {background: 'var(--primaryBGcolor)', color: 'var(--MainColor)'}, iconTheme: {primary: '#4487a2', secondary: '#fff'}})
    PromiseNotification({
        successFunction: () => {
            return <b>Фото профиля успешно удалено</b>
        },

        mainFunction: () => {
            if(!auth.currentUser) return Promise.reject(new Error('Пользователь не найден'))
            try{
                const avatar = ref(FBstorage, userSelector.userPhoto)
                return deleteObject(avatar)
            } catch(e) {
                return Promise.resolve()
            }
        }

    }).then(() => {
        if (!auth.currentUser) return new Error("Пользователь не найден")
        updateDoc(doc(db, 'Users', auth.currentUser.uid), {photo: ""})
            .then(() => {
                dispatch(changeUser({
                    userEmail: userSelector.userEmail,
                    userDisplayName: userSelector.userDisplayName,
                    userPhoto: null,
                    tag: userSelector.tag
                }))
            })
    })
}

