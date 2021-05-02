// constants
const LOAD = "groups/LOAD";
const ADD = "groups/ADD";
const REMOVE = 'groups/REMOVE';

const load = group => ({
    type: LOAD,
    payload: group
})

const add = transaction => ({
    type: ADD,
    payload: transaction
})

const unload = transaction => ({
    type: REMOVE,
    payload: transaction
})

export const group_transaction_delete = (transaction) => async (dispatch) => {
    const response = await fetch(`/api/expenses/${transaction}`,
    {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(unload(transaction))
    }
}

export const groupData = (groupId) => async (dispatch) => {
    const response = await fetch(`/api/groups/${groupId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const group = await response.json();
        dispatch(load(group))
        return group;
    }
}

export const addGroupTransaction = (response) => async (dispatch) => {
    const transaction = await response.json();
    dispatch(add(transaction))
}
const initialState = {}

const groupReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case LOAD:
            return { transaction_info: action.payload.transaction_info, users: action.payload.users, group_name: action.payload.group_name }
        case ADD:
            const dict = action.payload.transaction
            const key = Object.keys(dict)
            state['transaction_info'][key] = dict[key]
            return state
        case REMOVE:
            delete state['transaction_info'][action.payload]
            return state
        default:
            return state;
    }
}
export default groupReducer;
