import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserData } from '../../store/user';
import HeaderBar from '../HeaderBar';
import LeftSideBar from '../LeftSideBar';
import DashboardRight from '../RightSideBar/DashboardRight';
import '../Dashboard/Dashboard.css';

const RenderUserGroups = () => {
  // All of the groups associated with the logged in user
  const userGroups = useSelector((state) => state.userData.groups);
  const dispatch = useDispatch();
  useEffect(() => {
    //  Go and run this... and keep running the rest of the program without worring about what happens
    // getUserData sets our state = "Hey, I don't want to always access the backend all the time, just give me the data and I'll grab what I need... and SAVES it on the front end"
    dispatch(getUserData());
  }, [dispatch]);
    
  return (
    <>
      <div className="main-body">
        <HeaderBar />
        <LeftSideBar />
        <div className="main-bar">
          <div className="dashboard__top-banner">
            <div className="dashboard__name-title">Groups List</div>
          </div>
          {/* {' '} */}
          <div className="dashboard__users-header"></div>
          <div className="user-group-text">
            {/* Pull our data from the object that it's in */}
            {userGroups &&
              Object.entries(userGroups).map(([group_id, group_name]) => (
                <NavLink
                  key={group_id}
                  to={`/groups/${group_id}`}
                  exact={true}
                  activeClassName="sidebar-link"
                  className="user-group-link-text"
                >
                  {group_name}
                </NavLink>
              ))}
          </div>
        </div>
        <DashboardRight />
      </div>
    </>
  );
};

export default RenderUserGroups;
