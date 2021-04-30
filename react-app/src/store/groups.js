// constants
const LOAD = "groups/LOAD";

const load = group => ({
    type: LOAD,
    payload: group
})


export const groupData = (groupId) => async (dispatch) => {
    const response = await fetch(`/api/groups/${groupId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log("group here but didnt go in", response)
    if (response.ok) {
        const group = await response.json();
        dispatch(load(group))
        return group;
    }
}

const initialState = {}

const groupReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case LOAD:
            return { transaction_info: action.payload.transaction_info, minkidata: action.payload.minkidata }
        default:
            return state;
    }
}
export default groupReducer;
