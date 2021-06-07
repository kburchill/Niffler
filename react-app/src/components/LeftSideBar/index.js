import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import NewTransactionButton from '../TransactionForm/NewTransactionButton';

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
        {/* Groups Button Link to Groups  */}
      </div>

      <div className="left-sidebar__main left-sidebar-titles sidebar-link">
        <NavLink
          to="/groups"
          exact={true}
          activeClassName="sidebar-link-titles"
        >
          Groups
        </NavLink>
      </div>
      {/* I think we need to link to Groups here? */}
      <Link className="left-sidebar__top-group-button">+ ADD GROUP*</Link>
      {/* <Link to="/new-group" className="left-sidebar__top-group-button">+ ADD GROUP*</Link> */}
      <div className="left-sidebar__groups sidebar-link">
        {/* { typeof userGroups} */}
        {userGroups &&
          Object.entries(userGroups).map(([group_id, group_name]) => (
            <NavLink
              key={group_id}
              to={`/groups/${group_id}`}
              exact={true}
              activeClassName="active-group"
            >
              {group_name}
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
