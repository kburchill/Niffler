import React from "react";
// import { Link } from 'react-router-dom';
import HeaderBar from "../HeaderBar";

import landing from "../images/NifflerBankLanding.jpg";

const IntroductoryPage = () => {
    return (
      <div className="main-body">
        <HeaderBar />
        <div className="introductory-page__image-container">
          <div>
            <img src={landing} width="100%" alt="Welcome to Niffler!"></img>
          </div>
        </div>
      </div>
    );
}

export default IntroductoryPage;
