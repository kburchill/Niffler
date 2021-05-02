import React, { useState, useEffect } from "react";

import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import HeaderBar from "./components/HeaderBar"
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Dashboard from "./components/Dashboard"
import IntroductoryPage from "./components/IntroductoryPage"
import GroupPage from "./components/GroupPage"
import NewTransactionForm from "./components/TransactionForm/NewTransactionForm"
import EditTransactionForm from "./components/TransactionForm/EditTransactionForm"
import CreateGroupForm from "./components/GroupForm/CreateGroupForm"
import EditGroupForm from "./components/GroupForm/EditGroupForm"
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <HeaderBar /> */}
      {/* <NavBar /> */}
      <Switch>
        <Route path="/" exact={true}>
          <IntroductoryPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/dashboard" exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/groups/:groupId" exact={true}>
          <GroupPage />
        </ProtectedRoute>
        <Route path="/test-new-transaction" exact={true}>
          <NewTransactionForm />
        </Route>
        <Route path="/test-edit-transaction/:transactionId" exact={true}>
          <EditTransactionForm />
        </Route>
        <Route path="/test-new-group" exact={true}>
          <CreateGroupForm />
        </Route>
        <Route path="/test-edit-group/:groupId" exact={true}>
          <EditGroupForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
