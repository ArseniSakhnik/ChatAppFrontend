import React, {useState, useEffect} from 'react'
import Message from "./Message";
import Spinner from "../../spinner";
import {useChat} from "../../ChatProvider/ChatProvider";
import {useRecipients} from "../../ChatProvider/chatProviderRecipients";

export default function MessageHistory({data, userService}) {

    const [userName, setUserName] = useState('')
    const [messages, setMessages] = useState(null)
    const {dialogId} = useChat()
    const {recipients} = useRecipients()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('username'))
        setUserName(user.username)
    })

    useEffect(() => {
        console.log('message history render with data ', data, 'dialogId ', dialogId)
        console.log('message history woll show data: ', data, ' dialogId: ', dialogId, ' ', data[2], ' ', data[2]?.messages)

        if (data !== null && dialogId !== -1) {
            data.forEach((item) => {
                if (item.id === dialogId + 1) {
                    const dialogMessages = item.messages.map(item => {
                        return {
                            senderName: item.senderUsername,
                            text: item.text
                        }
                    })
                    setMessages(dialogMessages)
                }
            })
        }
    }, [data, dialogId, recipients])

    return (
        <div className="msg_history">
            {messages == null ? <div>Select dialog</div> : messages.map((item, i) => {
                return <Message key={i} senderName={item.senderName} userName={userName} text={item.text}/>
            })}
        </div>
    )
}