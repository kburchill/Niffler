// Still working on this. Checkin at 10:00

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { signUp } from '../../store/session';

const EditGroupForm = () => {
    const dispatch = useDispatch();
  // Do we need what's below?
    const group = useSelector((state) => state.session.user);
  // const [username, setUsername] = useState("");
    const [groupName, setGroupName] = useState('');
    const [groupUsers, setGroupUsers] = useState([]);

  // // Placeholder
  //   const onGroupCreation = async (e) => {
  //       e.preventDefault();
  //       if (groupName === repeatGroupName) {
  //           await dispatch(groupCreation(groupName));
  //           }
  //       };

    const updateGroupName = (e) => {
        setGroupName(e.target.value);
    };

    const onGroupSubmit = async (e) => {
        e.preventDefault();
        // Temporary fetch - use session thunk in finished version.
        const response = await fetch('/api/groups/<group_id>', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": groupName,
                "users": groupUsers
            })
        });
    }

    const updateGroupUsers = (e) => {
        const options = e.target.options;
        const values = []
        for (var i = 0; i < options.length; i++) {
            if (options.item(i).selected) values.push(options.item(i).value);
        }
        setGroupUsers(values);
    }


    return (
        <form onSubmit={onGroupSubmit}>
            <div>
                <label>Group Name</label>
                <input
                    type="text"
                    name="group-name"
                    onChange={updateGroupName}
                    value={groupName}
                ></input>
            </div>
            <div>
                <label htmlFor="users">Add users to group:</label>
                {/* These are temporary users. Finished version will dynamically get all users from store. */}
                <select multiple={true} onChange={updateGroupUsers}>
                    <option value="1">Demolition</option>
                    <option value="2">Harry</option>
                    <option value="3">Hermione</option>
                    <option value="4">Ronald</option>
                </select>
            </div>
            <button type="submit">Edit Group</button>
        </form>
        );
    };

export default EditGroupForm;
