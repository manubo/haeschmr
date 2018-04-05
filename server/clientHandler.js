module.exports = (io, blockchain) => {
  io.on('connection', client => {
    client.emit('blockchain', blockchain.toJSON());
    client.on('msg', block => {
      //if (blockchain.add(block)) {
      //}
    });
  });
};
