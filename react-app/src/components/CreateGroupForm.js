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

  // // Placeholder
  //   const onGroupCreation = async (e) => {
  //       e.preventDefault();
  //       if (groupName === repeatGroupName) {
  //           await dispatch(groupCreation(groupName));
  //           }
  //       };

    const createGroupName = (e) => {
    setGroupName(e.target.value);
    };


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

export default CreateGroupForm;
