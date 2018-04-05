const sha256 = require('sha256');

module.exports = class Block {
  static fromJSON(json) {
    const { data, prev, difficulty, time, nounce } = JSON.parse(json);
    return new Block({ data, prev, difficulty, time, nounce });
  }

  constructor({ data, prev, difficulty = '0000', time, nounce }) {
    this.data = JSON.stringify(data);
    this.prev = prev;
    this.difficulty = difficulty;
    this.time = time || new Date().getTime();
    this.nounce = nounce || this.computeHashWithProofOfWork();
  }

  computeHashWithProofOfWork() {
    let hash,
      nounce = -1;

    do {
      nounce += 1;
      hash = sha256(
        `${nounce}${this.time}${this.difficulty}${this.prev}${this.data}`
      );
    } while (hash.indexOf(this.difficulty) !== 0);

    return nounce;
  }

  attributes() {
    return {
      data: this.data,
      prev: this.prev,
      difficulty: this.difficulty,
      time: this.time,
      nounce: this.nounce
    };
  }

  get hash() {
    return sha256(
      `${this.nounce}${this.time}${this.difficulty}${this.prev}${this.data}`
    );
  }
};
