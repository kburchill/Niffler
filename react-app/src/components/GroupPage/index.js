import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
            if (transaction.length > 1) {
                console.log(transaction, transaction.length)
                return transaction.map(each_transaction => {
                    const first_name = each_transaction.first_name;
                    console.log(first_name, "first name here")
                    const amount = each_transaction.amount;
                    console.log(amount, "Well we have this value too")
                    return <li>{first_name} Owes me {amount}</li>
                })
            }
            else {
                return <li>{transaction[0].first_name} Owes me {transaction[0].amount}</li>
            }
            return (
                <li>{transaction.key} Amount here </li>
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
