// constants
const LOAD = "groups/LOAD";

const load = group => ({
    type: LOAD,
    group
})


export const groupData = (groupId) => async (dispatch) => {
    const response = await fetch(`api/groups/${groupId}`);
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
            return action.payload;
        default:
            return state;
    }
}

export default groupReducer;
