import React from "react";
import { NavLink } from "react-router-dom";

import "./LeftSideBar.css"

const LeftSideBar = () => {
    return (
        <div className="left-sidebar">
            <div className="left-sidebar__main">
                <NavLink to="/dashboard" exact={true} activeClassName="active">
                    Dashboard
                </NavLink>
            </div>
                
            <div className="left-sidebar__groups">
                <NavLink to="/groups/1" exact={true} activeClassName="active">
                    Group1
                </NavLink>
            
                <NavLink to="/groups/2" exact={true} activeClassName="active">
                    Group2
                </NavLink>
            </div>
        </div>
    )
}

export default LeftSideBar;