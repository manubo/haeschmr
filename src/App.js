import React, { Component } from 'react';
import Block from './models/Blockchain/Block';
import Transaction from './Transaction';
import Transactions from './Transactions';

import './App.css';

class App extends Component {
  render() {
    const { state: { user, blockchain } } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Häschmr</h1>
          <h3>
            <i>Account Number</i>
            <br />
            {user.accountNumber}
          </h3>
        </header>
        <div className="App-intro">
          <section className="transaction">
            <Transaction onSubmit={this.submitTransaction} />
          </section>
          <section>
            <Transactions blockchain={blockchain} user={user} />
          </section>
        </div>
      </div>
    );
  }

  submitTransaction = ({ accountCredit, amount }) => {
    const { state: { user, blockchain } } = this.props;

    const block = new Block({
      data: { accountDebit: user.accountNumber, accountCredit, amount },
      prev: blockchain.lastBlock().hash
    });
    this.props.onEmit('block', block.toJSON());
  };
}

export default App;
