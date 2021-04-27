import React from 'react';
import HeaderBar from "../HeaderBar"

import './Dashboard.css'

const Dashboard = () => {
    return (
        <div id='dashboard-body'>
            <HeaderBar />
            <div>
                This will be the body of the main dashboard page.
            </div>
        </div>
    )
}

export default Dashboard;