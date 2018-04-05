import uuid from 'uuid/v4';

let _accountNumber;

export default class User {
  constructor() {
    const { accountNumber } = this.load();
    _accountNumber = accountNumber;
    if (!_accountNumber) {
      _accountNumber = uuid();
      this.save();
    }
  }

  get accountNumber() {
    return _accountNumber;
  }

  load() {
    return JSON.parse(localStorage.getItem('user')) || {};
  }

  save() {
    localStorage.setItem('user', this.toJSON());
  }

  toJSON() {
    return JSON.stringify({ accountNumber: this.accountNumber });
  }
}

