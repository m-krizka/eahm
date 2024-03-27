/* global window */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware);

export const store = createStore(
  rootReducer,
  compose(middleware, window.window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.window.__REDUX_DEVTOOLS_EXTENSION__() : f => f),
);
