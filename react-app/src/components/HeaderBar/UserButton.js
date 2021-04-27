import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from "../../store/session";

const UserButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return (
        <>
            <button onClick={openMenu} id='navbar__profile-button'>
                {user.first_name}
            </button>
            
            {showMenu && (
                <ul className="profile-dropdown">
                    <div className="profile-dropdown__item">{user.username}</div>
                    <div className="profile-dropdown__item">{user.email}</div>
                    <div className="profile-dropdown__item">
                        <button onClick={onLogout}>Log Out</button>
                    </div>
                </ul>
            )}
        </>
    )
}

export default UserButton