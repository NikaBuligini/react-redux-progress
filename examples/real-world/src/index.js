import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'regenerator-runtime/runtime';

import api from './api';
import debounce from './debounce';
import reducers from './reducers';
import configureStore from './configureStore';
import App from './App';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState: ?Object = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = configureStore(
  preloadedState,
  applyMiddleware(thunk, api, debounce),
  reducers,
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
