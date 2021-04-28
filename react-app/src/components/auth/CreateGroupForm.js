import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { signUp } from '../../store/session';

const CreateGroupForm = () => {
    const dispatch = useDispatch();
  // Do we need what's below?
    const group = useSelector((state) => state.session.user);
  // const [username, setUsername] = useState("");
    const [groupName, setGroupName] = useState('');

  // Do we need what's below?
    const onGroupCreation = async (e) => {
        e.preventDefault();
        if (groupName === repeatGroupName) {
            await dispatch(onGroupCreation(groupName));
            }
        };

    const createGroupName = (e) => {
    setGroupName(e.target.value);
    // };

    // const updateEmail = (e) => {
    //   setEmail(e.target.value);
    // };
    // const updateFirstname = (e) => {
    //   setFirstname(e.target.value);
    // };
    // const updateLastname = (e) => {
    //   setLastname(e.target.value);
    // };

    // const updatePassword = (e) => {
    //   setPassword(e.target.value);
    // };

    // const updateRepeatPassword = (e) => {
    //   setRepeatPassword(e.target.value);
    // };

    // if (user) {
    //   return <Redirect to="/" />;
    // }

    return (
        <form onSubmit={createGroupForm}>
            <div>
                <label>Group Name</label>
                <input
                type="text"
                // What goes here? group.name? Group Name?
                name="gname"
                onChange={createGroupName}
                value={groupName}
                ></input>
            </div>
            <button type="submit">Sign Up</button>
        </form>
        );
    };
};

export default CreateGroupForm;
