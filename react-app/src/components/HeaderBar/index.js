import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import UserButton from './UserButton';
import './HeaderBar.css';

const HeaderBar = () => {
    const user = useSelector(state => state.session.user);
    return (
        <div id='header-bar'>
            <a href="/dashboard">
                <div class="niffler-logo"></div>
            </a>
            <div class="header-bar-options">
            <a href="/sign-up">
                <div hidden={user}>Sign Up</div>
            </a>
            <a href="/login">
                <div hidden={user}>Login</div>
            </a>
            <a href="/logout">
                <div hidden={!user}>Logout</div>
            </a>
            <a href="/">
                <div>About</div>
            </a>
            {user && <UserButton user={user}/>}
            </div>
        </div>
    )
}

export default HeaderBar;
