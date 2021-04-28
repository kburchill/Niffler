import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import LeftSideBar from "../LeftSideBar";
import HeaderBar from "../HeaderBar";
import GroupPageRight from "../RightSideBar/GroupPageRight";
import groupData from "../../store/groups"

import { useParams } from "react-router-dom";

const GroupPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const groupId = useParams()

    useEffect(() => {
        let groups = dispatch(groupData(1))
    }, [dispatch])

    return (
        <>
            <HeaderBar />
            <div className="main-body">
                <LeftSideBar />
                <div className='main-bar'>Group Page Content for group ID: </div>
                {/* <div>{groups[1]}</div> */}
                <GroupPageRight />
            </div>
        </>
    )
}

export default GroupPage
