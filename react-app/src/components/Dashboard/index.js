import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeaderBar from '../HeaderBar';
import LeftSideBar from '../LeftSideBar';
import DashboardRight from '../RightSideBar/DashboardRight';
import { getUserData } from '../../store/user';
import NewTransactionButton from '../TransactionForm/NewTransactionButton';

import wandDivider from "../../images/wandDivider.svg"

import './Dashboard.css';

const Dashboard = () => {
  const session = useSelector((state) => state.session.user);
  const userData = useSelector((state) => state.userData);
  const lenders = useSelector((state) => state.userData['lenders']);
  const debtors = useSelector((state) => state.userData['debtors']);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handleSettle = async () => {
        // Temporary fetch - use session thunk in finished version.
        const response = await fetch(`/api/expenses/settle/${session.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            window.location.reload()
        }
    }

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
              <div className="dashboard__balance__title-text">
                Total Balance
              </div>
              <div>{userData.total}</div>
            </div>
            <div>
              <img src={wandDivider} alt="Wand Divider."></img>
            </div>
            <div className="dashboard__balance">
              <div className="dashboard__balance__title-text">You Owe</div>
              <div>{userData.owe}</div>
            </div>
            <div>
              <img src={wandDivider} alt="Wand Divider."></img>
            </div>
            <div className="dashboard__balance">
              <div className="dashboard__balance__title-text">You Are Owed</div>
              <div>{userData.owed}</div>
            </div>
          </div>
          <div className="dashbard__top-banner__button-container">
            <NewTransactionButton />
            <button onClick={()=> handleSettle()} className="dashboard__top-settle-button">Settle Up</button>
          </div>
        </div>

        <div className="dashboard__users-header">
          <div className="owe-div">You owe</div>
          <img src={wandDivider} alt="Wand Divider"/>
          <div className="owed-div">You are owed</div>
        </div>
        <div className="dashboard__users-container">
          <div className="dashboard__users">
            <div className="lender-info">
              {lenders &&
                Object.values(lenders).map((lender) => (
                  <div className="dashboard__user-info">
                    <div>{lender.first_name + ' ' + lender.last_name} {lender.amount}</div>
                  </div>
                ))}
            </div>
            <div className="dashboard__users">
              <div className="debtor-info">
                {debtors &&
                  Object.values(debtors).map((debtor) => (
                    <div className="dashboard__user-info">
                      <div>{debtor.first_name + ' ' + debtor.last_name} {debtor.amount}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DashboardRight />
    </div>
  );
};

export default Dashboard;
