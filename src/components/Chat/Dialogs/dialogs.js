import React, {useEffect, useState, useCallback} from 'react'
import {HubConnectionBuilder} from "@microsoft/signalr";
import Dialog from "./Dialog";
import Spinner from "../../spinner";
import {useChat} from "../../ChatProvider/ChatProvider";
import {useRecipients} from "../../ChatProvider/chatProviderRecipients";

export default function Dialogs({data, showDialogue, connection, userService}) {

    const [username, setUsername] = useState('')
    const [dialogName, setDialogName] = useState('')
    const [dialogueParticipantsUnique, setDialogueParticipantsUnique] = useState([])
    const [dialogs, setDialogs] = useState([])

    useEffect(() => {
        console.log('dialogs render ')
        const user = JSON.parse(localStorage.getItem('username'))
        console.log('dialogs1: ', user)
        setUsername(user.username)
    }, [])

    const selectDialogue = (id, recipients) => {
        console.log('Select users ', recipients)
        selectRecipients(recipients)
        showDialogue(id)
    }

    const {selectRecipients} = useRecipients()

    useEffect(() => {
        setDialogs(data.map(item => {
            return (
                <div key={item.id} onClick={() => selectDialogue(item.id, item.name.split(', '))}>
                    <Dialog
                        name={item.name}
                        message={item.messages[item.messages.length - 1].text}
                        active={item.active}
                        connection={connection}
                        userService={userService}
                    />
                </div>
            )
        }))
    }, [data])


    return (
        <div>
            <div>
                {data == undefined ? <Spinner/> : dialogs}
            </div>
        </div>
    )

}