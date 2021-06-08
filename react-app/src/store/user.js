const SET_USER_DATA = "session/SET_USER_DATA";

export const setUserData = (userData) => ({
    type: SET_USER_DATA,
    payload: userData
})

export const getUserData = () => async (dispatch) => {
    const response = await fetch('/api/dashboard/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data)
    if (data.errors) {
        return;
    }
    return dispatch(setUserData(data));
}

export const settleTransactions = (user) => async (dispatch) => {
    const response = await fetch(`/api/`)
}

const initialState = {};
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return action.payload;
        default:
            return state;
    }
}
