import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
// import HeaderBar from '../HeaderBar';

import loginText from "../images/LogIn.png"

import './login.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <div className="main-body">
        {/* <HeaderBar /> */}
        {/* Containment Box */}
        <div className="login-form-div">
          {/* Start Form */}
          <form onSubmit={onLogin} id="login-form">
            {/* Logo */}
            <div className="login-logo">
              <img src={loginText} alt="Log In" />
            </div>
            {/* Email Description */}
            <div className="login-form-div__row">
              <label htmlFor="email">Email</label>
              {/* Input Field */}
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
                autoComplete="off"
                // className="nofocus"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              ></input>
            </div>
            <div className="buttonDiv">
              <button className="login-button-submit" type="submit">
                Login
              </button>
            </div>
            <div>
              {errors.map((error) => (
                <div className="error">{error}</div>
              ))}
            </div>
            <div>
              <a href="/sign-up" className="signup-link">
                Need an account? Sign up here!
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
