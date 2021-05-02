import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


import "./LeftSideBar.css"

const LeftSideBar = () => {
    const userGroups = useSelector(state => state.userData.groups);

    return (
      <div className="left-sidebar">
        <div className="left-sidebar__main sidebar-link">
          <NavLink
            to="/dashboard"
            exact={true}
            activeClassName="sidebar-link"
          >
            Dashboard
          </NavLink>
        </div>

        <div className="left-sidebar__groups sidebar-link">
          {/* { typeof userGroups} */}
          {userGroups &&
            Object.entries(userGroups).map(([group_id, group_name]) => (
              <NavLink
                key={group_id}
                to={`/groups/${group_id}`}
                exact={true}
                activeClassName="sidebar-link"
              >
                {group_name}
              </NavLink>
            ))}
        </div>
      </div>
    );
}

export default LeftSideBar;