import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [username, setUsername] = useState("");
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            await dispatch(signUp(username, email, password, first_name, last_name));
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };
    const updateFirstname = (e) => {
        setFirstname(e.target.value);
    };
    const updateLastname = (e) => {
        setLastname(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={onSignUp}>
            <div>
                <label>User Name</label>
                <input
                    type="text"
                    name="username"
                    onChange={updateUsername}
                    value={username}
                ></input>
            </div>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    name="first_name"
                    onChange={updateFirstname}
                    value={first_name}
                ></input>
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    onChange={updateLastname}
                    value={last_name}
                ></input>
            </div>
            <div>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    onChange={updateEmail}
                    value={email}
                ></input>
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={updatePassword}
                    value={password}
                ></input>
            </div>
            <div>
                <label>Repeat Password</label>
                <input
                    type="password"
                    name="repeat_password"
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                ></input>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;
