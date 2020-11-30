import React from 'react'

/**
 * Компонента сообщение
 * @param userName имя отправителя
 * @param senderName имя отправителя
 * @param text текст сообщения
 * @returns {JSX.Element}
 * @constructor
 */
export default function Message({userName, senderName, text}) {

    if (senderName == userName) {
        return (<div className="outgoing_msg">
            <div className="sent_msg">
                <p>{text}</p>
                <span className="time_date"> {senderName}</span></div>
        </div>)
    } else {
        return (
            <div className="incoming_msg">
                <div className="incoming_msg_img"><img
                    src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/></div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{text}</p>
                        <span className="time_date"> {senderName}</span></div>
                </div>
            </div>
        )
    }
}