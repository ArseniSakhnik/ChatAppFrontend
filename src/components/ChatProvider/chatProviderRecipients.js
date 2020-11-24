import React, {useReducer, useContext} from 'react'

const SELECT_RECIPIENTS = 'select_recipients'

const RecipientsContext = React.createContext()

export const useRecipients = () => {
    return useContext(RecipientsContext)
}

const reducer = (state, action) => {
    switch (action.type) {
        case SELECT_RECIPIENTS:
            return {
                ...state,
                recipients: action.recipients
            }
        default:
            return state
    }
}

export default function RecipientsProvider({children}) {
    const [state, dispatch] = useReducer(reducer, {
        recipients: null,
    })

    return (<RecipientsContext.Provider value={{
        recipients: state.recipients,
        selectRecipients: (recipients) => dispatch({
            type: SELECT_RECIPIENTS,
            recipients
        })
    }}>
        {children}
    </RecipientsContext.Provider>)



}