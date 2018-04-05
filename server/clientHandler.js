module.exports = (io) => {
  io.on('connection', client => {
    client.on('msg', payload => console.log(payload));
  });
};
