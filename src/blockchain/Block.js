import sha256 from 'sha256';

let _data, _prev, _difficulty, _time, _nounce;

export default class Block {
  constructor({ data, prev, difficulty = '0000' }) {
    _data = JSON.stringify(data);
    _prev = prev;
    _difficulty = difficulty;
    _time = new Date().getTime();
    _nounce = this.computeHashWithProofOfWork();
  }

  computeHashWithProofOfWork() {
    let hash, nounce = -1;

    do {
      nounce += 1;
      hash = sha256(`${nounce}${this.time}${this.difficulty}${this.prev}${this.data}`);
    } while (hash.indexOf(this.difficulty) !== 0);

    return nounce;
  }


  get data() {
    return _data;
  };

  get prev() {
    return _prev;
  };

  get difficulty() {
    return _difficulty;
  }

  get time() {
    return _time;
  }

  get nounce() {
    return _nounce;
  }

  get hash() {
    console.log(_nounce, _time, _difficulty, _prev, _data);
    return sha256(`${_nounce}${_time}${_difficulty}${_prev}${_data}`);
  }
}
