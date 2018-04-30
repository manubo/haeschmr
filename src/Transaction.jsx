import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Transaction extends Component {
  static propTypes = {
    accountCredit: PropTypes.string,
    amount: PropTypes.string,
    onSubmit: PropTypes.func
  };

  state = {
    changeset: {
      accountCredit: '',
      amount: ''
    }
  };

  render() {
    const { accountCredit, amount } = this.state.changeset;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Uslehne</h1>
        <div className="form-group">
          <label>Credit Account</label>
          <br />
          <input
            name="accountCredit"
            value={accountCredit}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <br />
          <input name="amount" value={amount} onChange={this.handleChange} />
        </div>
        <input type="submit" value="Jetzt uslehne" className="btn" />
      </form>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      changeset: {
        ...prevState.changeset,
        [name]: value
      }
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.changeset);
  };
}
