import React, {useState, useEffect} from "react";
import {useChat} from "../../ChatProvider/ChatProvider";
import {sendMessage} from "@microsoft/signalr/dist/esm/Utils";
import dialog from "../Dialogs/Dialog/dialog";
import {useRecipients} from "../../ChatProvider/chatProviderRecipients";

/**
 * Компонента отправки сообщения
 * @param connection прямое соединение
 * @returns {JSX.Element}
 * @constructor
 */
export default function InputMessage({connection}) {

    const [text, setText] = useState('')
    const [username, setUsername] = useState('')

    const {dialogId} = useChat()

    useEffect(() => {
        console.log('input message render ')
        const user = JSON.parse(localStorage.getItem('username'))
        console.log('input message1: ', user)
        setUsername(user.username)
    }, [])

    const changeText = (e) => {
        setText(e.target.value)
    }

    /**
     * Отправляет сообщение
     * @returns {Promise<void>}
     */
    const sendMessage = async () => {
        if (connection.connectionStarted && dialogId != -1) {
            console.log('input message: connection started')
            try {
                console.log('input message: sending message')
                await connection.invoke('SendMessage', username, dialogId + 1, text, recipients)
            } catch (e) {
                console.log('input message ', e)
            }
        }
        setText('')
    }

    const {recipients} = useRecipients()

    console.log('RECIPIENTS ', recipients)

    return (
        <div className="type_msg">
            <div className="input_msg_write">
                <input type="text" className="write_msg" placeholder="Type a message"
                       onChange={changeText}
                       value={text}
                />
                <button className="msg_send_btn" type="button" onClick={sendMessage}>
                    <i className="fa fa-paper-plane-o" aria-hidden="true"/>
                </button>
            </div>
        </div>
    )
}