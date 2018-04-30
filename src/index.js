import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import User from './models/User';
import io from 'socket.io-client';
import wsConnector from './wsConnector';

import './main.css';

const socket = io(':1337');

function initialize() {
  return {
    user: new User(),
    blockchain: { chain: [] }
  };
}

const state = initialize();
const ConnectedApp = wsConnector(state)(socket)(App);

ReactDOM.render(<ConnectedApp />, document.getElementById('root'));
