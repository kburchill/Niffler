import React from "react";
import { Link } from 'react-router-dom';
import HeaderBar from "../HeaderBar";

import landing from "../../images/NifflerBankLanding.jpg";

import "./IntroductoryPage.css";

const IntroductoryPage = () => {
    return (
      <div className="main-body">
        <HeaderBar />
        <div className="introductory-page__image-container">
          <Link to="/dashboard">
            <img src={landing} width="100%" alt="Welcome to Niffler!"></img>
          </Link>
          {/* <button>Get Started!</button> */}
          <div className="dev-message">Elements marked with a (*) are currently under development.</div>
        </div>
      </div>
    );
}

export default IntroductoryPage;
