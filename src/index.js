import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureInterceptor } from './services/axios-config';

import { Router } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';

import { createBrowserHistory } from 'history';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './store/reducers';
import { routerMiddleware } from 'react-router-redux';

import sagas from './store/sagas';

const browserHistory = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	rootReducer,
	applyMiddleware(
		routerMiddleware(browserHistory),
		sagaMiddleware
	)
)
sagaMiddleware.run(sagas)

configureInterceptor(store)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App></App>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
