import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from './models/User';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';
import wsConnector from './wsConnector';

const socket = io(':1337');

function initialize() {
  return {
    user: new User()
  };
}

const state = initialize();
const ConnectedApp = wsConnector(state)(socket)(App);


ReactDOM.render(<ConnectedApp />, document.getElementById('root'));
registerServiceWorker();
