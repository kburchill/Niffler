import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../LeftSideBar";
import HeaderBar from "../HeaderBar";
import GroupPageRight from "../RightSideBar/GroupPageRight";
import { groupData } from "../../store/groups"
import './GroupPage.css';

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
            // Map through each expense if multiple
            /*
            What data do we need to display?
            Group Name
            BEFORE HOVER:
            Transaction date:DONE , description: DONE, Name of person paid/amount, (what you lent/you owe NEEDS TO BE A SUM)
            AFTER HOVER:
            [Lender name and transaction amount], for each borrower, borrower name and amount
            */
            if (transaction.length > 1) {
                return (
                        <div className="transaction-div">
                            <div className="summary">
                                <div class="info-block">
                                    <div class="date">{transaction[0].expense_date}</div>
                                    <div class="description">{transaction[0].description}</div>
                                    <div class="lender">LOOK HERE==== {transaction[0].current_user_lender}</div>
                                </div>
                                <div class="cost">You Paid:{transaction[0].paid_amount}</div>
                            </div>
                            {
                                transaction.map(each_transaction => {
                                    return (
                                        <li className="detailed-info">
                                            {each_transaction.first_name} Owes me {each_transaction.amount}
                                        </li>
                                    )
                                })
                            }
                        </div>)
                    //return dynamic div and li based on transaction/expenses
            }
            else {
                return (
                    <div className="transaction-div">
                        <div className="summary">
                            <div class="info-block">
                                <div class="date">{transaction[0].expense_date}</div>
                                <div class="description">{transaction[0].description}</div>
                            </div>
                            <div class="cost">You Paid:{transaction[0].paid_amount}</div>
                            <div class="lent">You Lent: need to get this</div>
                        </div>
                        <li className="detailed-info">{transaction[0].first_name} Owes me {transaction[0].amount}</li>
                    </div>)
            }
        })
    }

    return (
        <>
            <HeaderBar />
            <div className="main-body">
                <LeftSideBar />
                <div className="center-block-main">
                    <h1 className='main-bar'>Group Page Content for group ID: </h1>
                    <div className="current-group-transactions">{renderGroupData()}</div>
                </div>
                <GroupPageRight />
            </div>
        </>
    )
}

export default GroupPage
