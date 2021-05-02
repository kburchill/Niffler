import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import UserButton from './UserButton';
import './HeaderBar.css';
import { logout } from "../../store/session";

import logo from "../images/NifflerLogo.png"

const HeaderBar = () => {
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return (
        <div id='header-bar'>
            <a href="/dashboard">
                <div class="niffler-logo">
                    <img src={logo}></img>
                </div>
            </a>
            <div class="header-bar-options">
                <a href="/login">
                    <div hidden={user}>Login</div>
                </a>
                <a href="/sign-up" >
                    <div hidden={user}>Sign-Up</div>
                </a>
                <a href="/">
                    <div>About</div>
                </a>
                {user && <UserButton user={user} />}
            </div>
        </div>
    )
}

export default HeaderBar;
