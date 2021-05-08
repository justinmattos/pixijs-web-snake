import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';

import GlobalStyle from '../containers/GlobalStyle';

import Navigation from './Navigation.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Navigation />
      <Router>
        <Switch></Switch>
      </Router>
    </Provider>
  );
};

export default App;
