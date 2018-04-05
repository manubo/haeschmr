const { last } = require('ramda');
const sha256 = require('sha256');
const Block = require('./Block');

module.exports = class Blockchain {
  static fromJSON(json) {
    const chain = JSON.parse(json);
    const genesisBlockAttrs = chain.shift();
    return chain.reduce((blockchain, blockAttrs) => {
      if (blockchain.add(new Block(blockAttrs))) {
        return blockchain;
      }
      throw new Error('Invalid Blockchain');
    }, new Blockchain(new Block(genesisBlockAttrs)));
  }

  constructor(genesisBlock) {
    this.chain = [genesisBlock];
  }

  add(block) {
    if (!this.verify(block)) {
      return false;
    }
    this.chain.push(block);
    return true;
  }

  lastBlock() {
    return last(this.chain);
  }

  verify(block) {
    if (block.hash.indexOf(block.difficulty) !== 0) {
      return false;
    }

    if (
      block.hash !==
      sha256(
        `${block.nounce}${block.time}${block.difficulty}${
          block.prev
        }${JSON.stringify(block.data)}`
      )
    ) {
      return false;
    }

    if (block.prev !== last(this.chain).hash) {
      return false;
    }

    if (
      block.time > new Date().getTime() ||
      block.time < last(this.chain).time
    ) {
      return false;
    }

    return true;
  }

  toJSON() {
    return JSON.stringify(this.chain.map(block => block.attributes()));
  }
};
