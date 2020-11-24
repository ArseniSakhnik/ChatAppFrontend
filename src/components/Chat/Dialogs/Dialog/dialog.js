import React, {useState, useEffect} from "react";
import AddRemoveModalForm from "../../../add-remove-modal-form";

export default function Dialog({name, message, active, connection, userService}) {

    const [classList, setClassList] = useState('chat_list')
    const [type, setType] = useState('')
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    return (
        <div>


            <AddRemoveModalForm connection={connection} type={type} handleShow={handleShow}
                                handleClose={handleClose} show={show} userService={userService}/>


            <div className={classList + ' dialogue-block'}>
                <div className='button-add-remove-user-to-dialog'>
                    <button className='btn btn-light' onClick={() => {handleShow(); setType('add')}}>+</button>
                    <button className='btn btn-light' onClick={() => {handleShow(); setType('remove')}}>-</button>
                </div>
                <div className="chat_people">
                    <div className="chat_img"><img
                        src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/></div>
                    <div className="chat_ib">
                        <h5 className={'message'}> {name} </h5>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}