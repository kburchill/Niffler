import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../LeftSideBar";
import HeaderBar from "../HeaderBar";
import GroupPageRight from "../RightSideBar/GroupPageRight";
import { groupData, group_transaction_delete } from "../../store/groups"
import { getUserData } from "../../store/user"
import EditTransactionButton from "../TransactionForm/EditTransactionButton"
import NewTransactionButton from "../TransactionForm/NewTransactionButton"
import './GroupPage.css';

import { useParams } from "react-router-dom";

const GroupPage = () => {
    const user = useSelector(state => state.user);
    const transaction_info = useSelector(state => state.groups.transaction_info);
    const group_name = useSelector(state => state.groups.group_name)

    const dispatch = useDispatch();

    const groupId = useParams();

    useEffect(() => {

        dispatch(groupData(groupId.groupId))
        dispatch(getUserData())
    }, [dispatch, groupId])


    const delete_transaction = (transaction) => {
        dispatch(group_transaction_delete(transaction))
        window.location.reload()
    }

const renderGroupData = () => {
        return transaction_info && Object.values(transaction_info).map(transaction => {
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
                                <div class="paid">
                                    <div>{transaction[0].current_user_lender} Paid:
                                            <div>{transaction[0].paid_amount}</div>
                                    </div>
                                </div>
                                <div class="lent">
                                    <div>{transaction[0].current_user_lender} lent </div>
                                    <div>{transaction[transaction.length - 1].total_debt_owed}</div>
                                </div>
                            <button className="delete_trans" onClick={() => delete_transaction(transaction[0].transaction_id)}>Avada Kedavra</button>
                            </div>
                        </div>
                        <div className="detailed-info-container">
                            {transaction.map(each_transaction => {
                                return (
                                    <div className="detailed-info">
                                        {each_transaction.first_name} Owes {each_transaction.current_user_lender} {each_transaction.amount}
                                    </div>
                                    )
                            })}
                        </div>
                    </div>)
            }
            else {
                return (
                    <div className="transaction-div">
                        <div className="summary">
                            <div class="info-block">
                                <div class="date">{transaction[0].expense_date}</div>
                                <div class="description">{transaction[0].description}</div>
                                <div class="paid">{transaction[0].current_user_lender} paid <div>{transaction[0].paid_amount}</div></div>
                                <div class="lent">{transaction[0].current_user_lender} lent <div>{transaction[0].total_debt_owed}</div></div>
                                <button className="delete_trans" onClick={() => delete_transaction(transaction[0].transaction_id)}>Avada Kedavra</button>
                            </div>
                        </div>
                        <div className="detailed-info-container">
                            <div className="detailed-info">{transaction[0].first_name} Owes {transaction[0].current_user_lender} {transaction[0].amount}</div>
                        </div>
                    </div>)
            }
        })
    }

    return (
        <>
            <div className="main-body">
                <HeaderBar />
                <LeftSideBar />
                <div className="center-block-main">
                    <div className="group-header">
                        <h1 className="group-name">{group_name}</h1>
                        <div className="group-buttons">
                            <NewTransactionButton />
                            <button className="dashboard__top-settle-button">
                                Settle Up*
                            </button>
                        </div>
                    </div>
                    <div className="current-group-transactions">
                        {renderGroupData()}
                    </div>

                </div>
                <div>
                    <GroupPageRight />
                </div>

            </div>
        </>
    )
}

export default GroupPage
