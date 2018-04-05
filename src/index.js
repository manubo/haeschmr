import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from './models/User';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';

const socket = io(':1337');

function initialize() {
  return {
    user: new User(),
  };
}

const state = initialize();

ReactDOM.render(<App state={state} />, document.getElementById('root'));
registerServiceWorker();
