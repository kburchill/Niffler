import React from "react";
import LeftSideBar from "../LeftSideBar";
import HeaderBar from "../HeaderBar";
import GroupPageRight from "../RightSideBar/GroupPageRight";

import { useParams } from "react-router-dom";

const GroupPage = () => {
    const { groupId } = useParams();
    return (
        <>
            <HeaderBar />
            <div className="main-body">
                <LeftSideBar />
                <div className='main-bar'>Group Page Content for group ID: {groupId}</div>
                <GroupPageRight />
            </div>
        </>
    )
}

export default GroupPage