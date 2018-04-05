const Block = require('../src/models/Blockchain/Block');

module.exports = (io, blockchain) => {
  io.on('connection', client => {
    client.emit('blockchain', blockchain.toJSON());
    client.on('block', json => {
      const block = Block.fromJSON(json);
      if (blockchain.add(block)) {
        client.broadcast.emit('newBlock', json);
        client.emit('newBlock', json);
      }
    });
  });
};
