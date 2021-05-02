import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import UserButton from './UserButton';
import './HeaderBar.css';
import { logout } from "../../store/session";

const HeaderBar = () => {
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return (
        <div id='header-bar'>
            <a href="/dashboard">
                <div class="niffler-logo"></div>
            </a>
            <div class="header-bar-options">
                <a href="/">
                    <div>About</div>
                </a>
                {user && <UserButton user={user} />}
            </div>
        </div>
    )
}

export default HeaderBar;
