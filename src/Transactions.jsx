import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, view, lensPath } from 'ramda';

const dataValue = type => view(lensPath(['data', type]));

const creditAccount = dataValue('accountCredit');

const debitAccount = dataValue('accountDebit');

const amount = dataValue('amount');

const userTransactions = (blockchain, user) =>
  blockchain.chain.filter(block => {
    return (
      creditAccount(block) === user.accountNumber ||
      debitAccount(block) === user.accountNumber
    );
  });

const signedAmount = (block, user) =>
  creditAccount(block) === user.accountNumber
    ? parseInt(amount(block), 10)
    : -parseInt(amount(block), 10);

export default class Transactions extends Component {
  static propTypes = {
    blockchain: PropTypes.object,
    user: PropTypes.object
  };

  render() {
    return (
      <div className="transactions">
        <h2>Your Transactions</h2>
        {this.renderTransactions()}
      </div>
    );
  }

  renderTransactions() {
    const { blockchain, user } = this.props;
    const blocks = userTransactions(blockchain, user);

    if (isEmpty(blocks)) {
      return 'No transactions';
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{blocks.map(this.renderTransactionRow)}</tbody>
      </table>
    );
  }

  renderTransactionRow = block => {
    const { user } = this.props;
    return (
      <tr key={block.hash}>
        <td>{new Date(block.time).toLocaleString()}</td>
        <td>{creditAccount(block)}</td>
        <td>{debitAccount(block)}</td>
        <td>{signedAmount(block, user)}</td>
      </tr>
    );
  };
}
