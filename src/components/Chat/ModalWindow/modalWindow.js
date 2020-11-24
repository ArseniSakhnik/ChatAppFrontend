import React, {useEffect, useState} from 'react'
import {Button, Modal} from "react-bootstrap";
import Error from "../../error";

export default function ModalWindow({show, handleClose, connection, userService}) {

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [recipient, setRecipient] = useState('')

    useEffect(() => {
        if (recipient) console.log(recipient.replace(/\s/g, ''))
    })


    const handleRecipientUpdate = (e) => {
        setRecipient(e.target.value)
    }

    const handleMessageUpdate = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = () => {
        userService.userExists(recipient.replace(/\s/g, ''))
            .then(async (response) => {
                if (connection.connectionStarted) {
                    console.log('modal window: connection started')
                    try {
                        console.log('modal window: sending message ')
                        await connection.invoke("CreateDialogAndSendMessage", recipient, message)
                        handleClose()
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    setError("Не удалось подключиться к серверу")
                }
            })
            .catch((e) => {
                console.log(e)
                if (e.message = "Request failed with status code 404"){
                    setError("Пользовательи с таким никнеймом не найден")
                }
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Отправить сообщение</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='form-group row'>
                    <div className="col-md-11">
                        <input type="text" className="form-control"
                               name="email-address" required autoFocus
                               placeholder='Кому...'
                               value={recipient}
                               onChange={handleRecipientUpdate}
                        />
                        <div className="form-group">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                      placeholder="Ваше сообщение"
                                      value={message}
                                      onChange={handleMessageUpdate}
                            ></textarea>
                        </div>
                        {error.length > 0 ? <Error errorMessage={error}/> : <div></div> }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={sendMessage}>
                    Отправить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}