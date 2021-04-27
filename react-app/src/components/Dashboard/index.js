import React from 'react';
import HeaderBar from "../HeaderBar"
import LeftSideBar from "../LeftSideBar"
import DashboardRight from "../RightSideBar/DashboardRight"

import './Dashboard.css'

const Dashboard = () => {
    return (
        <div className='main-body'>
            <HeaderBar />
            <LeftSideBar />
            <div className='main-bar'>
                This will be the body of the main dashboard page.
            </div>
            <DashboardRight />
        </div>
    )
}

export default Dashboard;