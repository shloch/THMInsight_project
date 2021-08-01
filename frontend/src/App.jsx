import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Link, Switch, Route,
} from 'react-router-dom';

import ProfilePage from './pages/profile';
import CreateUser from './componenets/CreateUser';

function App() {
  return (
    <div className="root">
      {/* <ProfilePage /> */}

      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/createUser">createUser</Link>
        </nav>
        <Switch>
          <Route exact path="/">
            {/* <Home /> */}
          </Route>
          <Route path="/ProfilePage">
            <ProfilePage />
          </Route>
          <Route path="/createUser">
            <CreateUser />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
