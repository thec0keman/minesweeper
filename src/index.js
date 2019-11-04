import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(reducers);

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
