import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserData } from '../../store/user';
import HeaderBar from '../HeaderBar';
import LeftSideBar from '../LeftSideBar';
import DashboardRight from '../RightSideBar/DashboardRight';

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
          <HeaderBar />
          <LeftSideBar />
      <div>
        {' '}
        Potato
        <div>
          {/* Pull our data from the object that it's in */}
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
          <DashboardRight />
    </>
  );
};

export default RenderUserGroups;
