import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../LeftSideBar";
import HeaderBar from "../HeaderBar";
import GroupPageRight from "../RightSideBar/GroupPageRight";
import { groupData } from "../../store/groups"
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
    //     dispatch(groupData(groupId.groupId));
    // }, [groupId, dispatch]);

        dispatch(groupData(groupId.groupId))
        dispatch(getUserData())
    }, [dispatch, groupId])

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
                            </div>
                            
                        </div>
                        {
                            transaction.map(each_transaction => {
                                return (
                                    <li className="detailed-info">
                                        {each_transaction.first_name} Owes {each_transaction.current_user_lender} {each_transaction.amount}
                                    </li>
                                )
                            })
                        }
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
                                <div class="lent">{transaction[0].current_user_lender} lent <div>{transaction[0].first_name}</div></div>
                            </div>
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
                <div>
                <LeftSideBar />
                </div>
                <div className="center-block-main">
                    <div className="group-header">
                    <h1 className="group-name">{group_name}</h1>

                    </div>
                    <div className="current-group-transactions">
                        <NewTransactionButton />
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
