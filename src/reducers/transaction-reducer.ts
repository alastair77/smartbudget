import { Transaction } from "../types"



// type = 'Action to execute', payload='new data for the state'
export type TransactionActions =
    { type: 'save-transaction', payload: { newTransaction: Transaction } } |
    { type: 'set-activeId', payload: { id: Transaction['id'] } }

// Type of initial state
export type TransactionState = {
    transactions: Transaction[],
    activeId: Transaction['id']
}


// initial state 
export const initialState: TransactionState = {
    transactions: [],
    activeId: ''
}

// Reducer
export const transactionReducer = (
    state: TransactionState = initialState,
    action: TransactionActions
) => {
    if (action.type === 'save-transaction') {

        return {
            ...state,
            transactions: [...state.transactions, action.payload.newTransaction]
        }
    }

    if(action.type === 'set-activeId') {
        return {
            ...state,
            activeId : action.payload.id
        }

    }
    return state;
}