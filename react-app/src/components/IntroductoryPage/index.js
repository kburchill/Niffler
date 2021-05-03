import React from 'react';
import { Link } from 'react-router-dom';
import HeaderBar from '../HeaderBar';
import './IntroductoryPage.css';

const IntroductoryPage = () => {
  return (
    <div className="main-body">
      <HeaderBar />
      <div className="introductory-page__image-container">
        <div>
          <img src="images/NifflerBankLanding.jpg" width="100%"></img>
        </div>
      </div>
      <div className="team">
        {/* <div className ="person">
              
              <div className="profile-pic">
              </div>
              <div className="profile-name">
              Kent 
              </div>
              <div className="linkedin">
              </div>
              <div className="github">
              </div>
            <div className ="person">
              
              <div className="profile-pic">
              </div>
              <div className="profile-name">
              
              </div>
              <div className="linkedin">
              </div>
              <div className="github">
              </div>
            <div className ="person">
              
              <div className="profile-pic">
              </div>
              <div className="profile-name">
              
              </div>
              <div className="linkedin">
              </div>
              <div className="github">
              </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default IntroductoryPage;
