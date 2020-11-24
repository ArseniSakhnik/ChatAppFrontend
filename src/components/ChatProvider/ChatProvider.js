import React, {useReducer, useContext} from 'react'
import RecipientsProvider from "./chatProviderRecipients";


const SELECT_DIALOGUE = 'select_dialogue'
const SELECT_RECIPIENTS = 'select_recipients'

const ChatContext = React.createContext()

export const useChat = () => {
    return useContext(ChatContext)
}

const reducer = (state, action) => {
    switch (action.type) {
        case SELECT_DIALOGUE:
            return {
                ...state,
                dialogId: action.dialogId - 1
            }
        default:
            return state
    }
}

export default function ChatProvider({children}) {
    const [state, dispatch] = useReducer(reducer, {
        dialogId: -1,
    })

    return (
        <RecipientsProvider>
            <ChatContext.Provider value={{
                dialogId: state.dialogId,
                selectDialog: (dialogId) => dispatch({
                    type: SELECT_DIALOGUE,
                    dialogId
                })
            }}>
                {children}
            </ChatContext.Provider>
        </RecipientsProvider>
    )
}