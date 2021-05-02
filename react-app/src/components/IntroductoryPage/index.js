import React from "react";
import { Link } from 'react-router-dom';
import HeaderBar from "../HeaderBar";


const IntroductoryPage = () => {
    return (
      <div className="main-body">
        <HeaderBar />
        <div className="introductory-page__image-container">
          <div>
            <img src="images/NifflerBankLanding.jpg" width="100%"></img>
          </div>
        </div>
      </div>
    );
}

export default IntroductoryPage;
