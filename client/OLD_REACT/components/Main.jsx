import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import GlobalStyle from '../containers/GlobalStyle';
import App from './App.jsx';

const Main = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  );
};

export default Main;
