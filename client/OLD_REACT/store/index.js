import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import token from './reducers/token';

const reducer = combineReducers({ token });

const composedEnhancer = composeWithDevTools(applyMiddleware());

const store = createStore(reducer, composedEnhancer);

export default store;
