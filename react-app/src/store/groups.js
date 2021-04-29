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
        console.log("group here did go in", group)
        return group;
    }
}

const initialState = {}

const groupReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case LOAD:
            return action.payload;
        default:
            return state;
    }
}

export default groupReducer;
