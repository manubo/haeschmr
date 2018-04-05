import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from './models/User';
import registerServiceWorker from './registerServiceWorker';
import Blockchain from './models/Blockchain';
import io from 'socket.io-client';

const socket = io(':1337');

function initialize() {
  return {
    user: new User()
  };
}

socket.on('blockchain', blockchain =>
  console.log(Blockchain.fromJSON(blockchain))
);

const state = initialize();

ReactDOM.render(<App state={state} />, document.getElementById('root'));
registerServiceWorker();
