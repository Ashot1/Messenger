import {FC} from "react";
import styles from "./MessagesDialogWindow.module.sass"
import MessageHeader from "../../ENTITY/MessageHeader";
import MessagesDialogList from "../../ENTITY/MessagesDialogList";
import MessageSendField from "../../ENTITY/MessageSendField";
import {messageList} from "../../STORE";

const LoadingMessagesDialogWindow: FC = () => {

    const fakeMessageList: messageList  = {id: '1', users: ['1'], applicants: ['1'], type: "private", message: []}
    return (
        <div className={styles.dialogWindowWrapper}>
            <MessageHeader PageUser={{photo: ' ', name: 'Загрузка', tag: "Загрузка", uid: "Загрузка"}} loading={true} pageID='123' messageList={fakeMessageList}/>
            <MessagesDialogList messages={[]} PageUser={{photo: ' ', name: 'Загрузка', tag: "Загрузка", uid: "Загрузка"}} loading={true} pageID="1234"/>
            <MessageSendField messagesPrev={[]} id={'1'} CurrentUserID={'2'}/>
        </div>
        )
};

export default LoadingMessagesDialogWindow;