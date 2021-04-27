import React from "react";
import { Link } from 'react-router-dom';


const IntroductoryPage = () => {
    return (
        <div>
            <div>
                <Link to="/login">
                    Login
                </Link>
                <Link to="/sign-up">
                    Signup
                </Link>
            </div>
            <div>
                Intro Page Body
            </div>
        </div>
    )
}

export default IntroductoryPage;