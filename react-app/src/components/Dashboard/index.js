import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import HeaderBar from "../HeaderBar"
import LeftSideBar from "../LeftSideBar"
import DashboardRight from "../RightSideBar/DashboardRight"
import { getUserData } from "../../store/user"
import NewTransactionButton from "../TransactionForm/NewTransactionButton"

import './Dashboard.css'

const Dashboard = () => {
    const session = useSelector(state => state.session.user)
    const userData = useSelector(state => state.userData);
    const lenders = useSelector(state => state.userData["lenders"]);
    const debtors = useSelector(state => state.userData["debtors"]);

    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getUserData())
    }, [dispatch])

    return (
      <div className="main-body">
        <HeaderBar />
        <LeftSideBar />
        <div className="main-bar">
          <div className="dashboard__top-banner">
            <div className="dashboard__name-title">
              {session.first_name}'s Dashboard
            </div>

            <div className="dashboard__balances-bar">
              <div className="dashboard__balance">
                <div>total balance</div>
                <div>{userData.total}</div>
              </div>
              <div>
                <img src="/images/wandDivider.svg"></img>
              </div>
              <div className="dashboard__balance">
                <div>you owe</div>
                <div>{userData.owe}</div>
              </div>
              <div>
                <img src="/images/wandDivider.svg"></img>
              </div>
              <div className="dashboard__balance">
                <div>you are owed</div>
                <div>{userData.owed}</div>
              </div>
            </div>
            <div className="dashbard__top-banner__button-container">
              <NewTransactionButton />
              <button className="dashboard__top-settle-button">
                Settle Up
              </button>
            </div>
          </div>
          <div className="dashboard__users-header">
            <div>You owe</div>
            <div>You are owed</div>
          </div>
          <div className="dashboard__users-container">
            <div className="dashboard__users">
              {lenders &&
                Object.values(lenders).map((lender) => (
                  <div className="dashboard__user-info">
                    <div>{lender.first_name + ' ' + lender.last_name}</div>
                    <div>{lender.amount}</div>
                  </div>
                ))}
            </div>
            <div className="dashboard__users">
              {debtors &&
                Object.values(debtors).map((debtor) => (
                  <div className="dashboard__user-info">
                    <div>{debtor.first_name + ' ' + debtor.last_name}</div>
                    <div>{debtor.amount}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <DashboardRight />
      </div>
    );
}

export default Dashboard;