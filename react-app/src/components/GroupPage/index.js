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
                    return <li className={`transaction-id-${each_transaction.transaction_id}`}>{each_transaction.first_name} Owes me {each_transaction.amount} for {each_transaction.description}</li>

                })
            }
            else {
                return <li className={`transaction-id-${transaction[0].transaction_id}`}>{transaction[0].first_name} Owes me {transaction[0].amount} for {transaction.description}</li>
            }
        })
    }

    return (
        <>
            <HeaderBar />
            <div className="main-body">
                <LeftSideBar />
                <h1 className='main-bar'>Group Page Content for group ID: </h1>
                <div>{renderGroupData()}</div>
                <GroupPageRight />
            </div>
        </>
    )
}

export default GroupPage
