import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

import ProfilePage from './pages/profile';
import CreateUser from './componenets/CreateUser';
import Login from './componenets/Login';
import EditUser from './componenets/editUser';

function App() {
  return (
    <div className="mainSection">
      {/* <ProfilePage /> */}

      <Router>
        <Switch>
          <Route exact path="/">
            <CreateUser />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/ProfilePage">
            <ProfilePage />
          </Route>
          <Route path="/createUser">
            <CreateUser />
          </Route>
          <Route path="/editUser">
            <EditUser />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
