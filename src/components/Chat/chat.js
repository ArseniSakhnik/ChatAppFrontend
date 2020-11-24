import React, {useState, useEffect, useCallback} from 'react'
import {HubConnectionBuilder, HttpTransportType} from "@microsoft/signalr";
import './chat.css'
import Dialogs from "./Dialogs";
import MessageHistory from "./MessageHistory";
import InputMessage from "./InputMessage";
import {useChat} from "../ChatProvider/ChatProvider";
import {Modal, Button} from "react-bootstrap";
import ModalWindow from "./ModalWindow";


export default function Chat({userService}) {

    const [connection, setConnection] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('jwtToken'))
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {

    })

    useEffect(() => {
        console.log('chat render ')
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44353/dialogs', {
                accessTokenFactory: () => token,
            },).build()
        setConnection(newConnection)
    }, [])

    useEffect(() => {
        console.log('chat render with hub connection')
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('chat: connected')
                    connection.on('GetDialogs', response => {
                        console.log('chat getting data ', response)
                        response.forEach((item) => item.active = false)
                        setData(response)
                    })

                })
                .then(() => handleChecking())
                .then(() => {

                })
                .catch(e => console.log('chat: Connection failed: ', e))
        }
        setToken(localStorage.getItem('jwtToken'))
    }, [connection])

    const handleChecking = async () => {
        console.log('chat: ', token)
        if (connection.connectionStarted) {
            console.log('chat: connection started')
            try {
                await connection.send('SendDialogs', null)
            } catch (e) {
                console.log('chat ', e)
            }
        } else {
            console.log('chat: No connection to server yet')
            connection.start()
        }
    }


    const {selectDialog, dialogId} = useChat()

    const showDialogue2 = (id) => {
        selectDialog(id)
    }

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const logOut = () => {
        localStorage.removeItem('username')
        window.location.reload()
    }

    return (
        <div>

            <ModalWindow handleShow={handleShow} handleClose={handleClose} show={show} connection={connection}
                         userService={userService}/>

            <div className="container">
                <h3 className="text-center test">Messaging</h3>
                <button className='btn btn-light logout-button' onClick={logOut}>Log out</button>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="inbox_people">
                            <div className="headind_srch">
                                <div className="recent_heading">
                                    <h4>Recent</h4>
                                </div>
                                <div className="srch_bar">
                                    <div className="stylish-input-group">
                                        <Button variant={'primary'} onClick={handleShow}>
                                            Написать сообщение
                                        </Button>
                                        <span className="input-group-addon">
                                        <button type="button">
                                            <i className="fa fa-search" aria-hidden="true"/>
                                        </button>
                                    </span>
                                    </div>
                                </div>
                            </div>


                            <Dialogs data={data} showDialogue={showDialogue2} connection={connection} userService={userService}/>

                        </div>
                        <div className="mesgs">

                            <MessageHistory data={data} userService={userService}/>

                            <InputMessage connection={connection}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}