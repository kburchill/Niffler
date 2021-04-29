import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import LeftSideBar from "../LeftSideBar";
import HeaderBar from "../HeaderBar";
import GroupPageRight from "../RightSideBar/GroupPageRight";
import { groupData } from "../../store/groups"

import { useParams } from "react-router-dom";

const GroupPage = () => {
    const user = useSelector(state => state.session.user);
    const groups = useSelector(state => state.groups);
    const dispatch = useDispatch();
    const groupId = useParams()
    useEffect(() => {
        dispatch(groupData(groupId.groupId))
    }, [dispatch])
    const renderGroupData = () => {
        return Object.values(groups).map(transaction => {
            return (
                <li>{transaction.Amount} Amount here </li>
            )
        })
    }

    return (
        <>
            <HeaderBar />
            <div className="main-body">
                <LeftSideBar />
                <div className='main-bar'>Group Page Content for group ID: </div>
                <div>{renderGroupData()}</div>
                <GroupPageRight />
            </div>
        </>
    )
}

export default GroupPage
