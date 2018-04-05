import React, { Component } from 'react';
import './App.css';
import Block from './blockchain/Block';

class App extends Component {
  render() {
    const { state: { user } } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Häschmr</h1>
          <h3><i>Account Number</i><br />{user.accountNumber}</h3>
        </header>
        <p className="App-intro">
          Welcome
        </p>
      </div>
    );
  }
}

export default App;
