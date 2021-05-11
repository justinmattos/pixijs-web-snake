import React, { useState } from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Navigation from './Navigation.jsx';
import Login from './dashboard/Login.jsx';
import Game from './gamearea/Game.jsx';

import { setToken } from '../store/reducers/token';

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(({ token }) => ({ token }));
  if (!token) {
    const localToken = window.localStorage.getItem('token');
    console.log(localToken);
    dispatch(setToken(localToken));
  }
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          Home
        </Route>
        <Route path="/dashboard" exact>
          Dashboard
        </Route>
        <Route component={Login} path="/login" exact>
          Login
        </Route>
        <Route component={Game} path="/snake" exact />
        <Route>
          Page not Found <Link to="/">Return Home</Link>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
