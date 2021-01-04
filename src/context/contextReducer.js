// Reducer => fucntion that take (state, an action) then return a new state
const contextReducer = (state, action) => {
    let transactions;
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            transactions = state.filter((transaction) => transaction.id !== action.payload);
            return transactions;
        case 'CREATE_TRANSACTION':
            transactions = [action.payload, ... state];
            return transactions;
        default:
            break;
    };
}

export default contextReducer;
