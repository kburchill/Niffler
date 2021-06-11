import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { signUp } from '../../store/session';

import HeaderBar from "../HeaderBar";
import LeftSideBar from "../LeftSideBar";
import GroupPageRight from "../RightSideBar/GroupPageRight";

const CreateGroupForm = () => {
    // const dispatch = useDispatch();
    // const group = useSelector((state) => state.session.user);
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
        await fetch('/api/groups/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": groupName,
                "users": groupUsers
            })
        });
        window.location.href = ("/dashboard")
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
        <div className="main-body">
            <HeaderBar />
            <LeftSideBar />
            <div className="center-block-main">
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
                    <button type="submit">Create Group</button>
                </form>
            </div>
            <div>
                <GroupPageRight />
            </div>
        </div>
    );
};

export default CreateGroupForm;
