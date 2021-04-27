import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import UserButton from './UserButton';

import './HeaderBar.css';

const HeaderBar = () => {
    const user = useSelector(state => state.session.user);
    return (
        <div id='header-bar'>
            <Link to='/dashboard'>
                Niffler
            </Link>
            {user && <UserButton user={user}/>}
        </div>
    )
}

export default HeaderBar;