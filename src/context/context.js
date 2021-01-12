import React, { useReducer, createContext } from 'react';

import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{"amount":24,"category":"Gifts","type":"Income","date":"2021-01-07","id":"93845340-5c88-409b-a0dc-21573422d739"},{"amount":80,"category":"Food","type":"Expense","date":"2021-01-11","id":"d1eb57e7-ca10-4fc8-b7b5-b625cb343007"},{"amount":100,"category":"Salary","type":"Income","date":"2021-01-18","id":"9f53295c-ce3e-49af-8877-04f3cf8d0cb3"}];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState)

    // Actions Creators
    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }

    const createTransaction = (transaction) => {
        dispatch({ type: 'CREATE_TRANSACTION', payload: transaction });
    }
    
    const balance = transactions.reduce((acc, curVal) => {
        return (curVal.type === 'Expense' ? acc - curVal.amount : acc + curVal.amount)
    }, 0);

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            createTransaction,
            transactions,
            balance,
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}
