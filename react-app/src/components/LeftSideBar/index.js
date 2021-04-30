import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import CreateGroupButton from "../GroupForm/CreateGroupButton"

import "./LeftSideBar.css"

const LeftSideBar = () => {
    const userGroups = useSelector(state => state.userData.groups);

    return (
        <div className="left-sidebar">
            <div className="left-sidebar__main">
                <NavLink to="/dashboard" exact={true} activeClassName="active">
                    Dashboard
                </NavLink>
                <CreateGroupButton />
            </div>
                
            <div className="left-sidebar__groups">
                {/* { typeof userGroups} */}
                
                {userGroups && Object.entries(userGroups).map(([group_id, group_name]) => (
                    <NavLink key={group_id} to={`/groups/${group_id}`} exact={true} activeClassName="active">
                        {group_name}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default LeftSideBar;