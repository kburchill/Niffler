import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NewTransactionButton from '../TransactionForm/NewTransactionButton';

import './LeftSideBar.css';

const LeftSideBar = () => {
  const userGroups = useSelector((state) => state.userData.groups);

  return (
    <div className="left-sidebar__container">
      <div className="left-sidebar__main left-sidebar-titles sidebar-link">
        <NavLink
          to="/dashboard"
          exact={true}
          activeClassName="sidebar-link-titles"
        >
          Dashboard
        </NavLink>
      </div>
      {/* I think we need to link to Groups here? */}
      <div className="left-sidebar-titles">groups</div>
      <button className="left-sidebar__top-group-button">+ ADD GROUP</button>
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
};

export default LeftSideBar;
