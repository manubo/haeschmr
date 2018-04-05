const Koa = require('koa');
const serve = require('koa-static');
const clientHandler = require('./clientHandler');
const Blockchain = require('../src/models/Blockchain');
const Block = require('../src/models/Blockchain/Block');
const uuid = require('uuid/v4');
const app = new Koa();
app.use(serve('./build'));

const PORT = process.env.PORT || 1337;
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const genesisAccount = uuid();
const genesisBlock = new Block({
  data: {
    accountDebit: genesisAccount,
    accountCredit: genesisAccount,
    amount: 0
  },
  prev: '0000000000000000000000000000000000000000000000000000000000000000'
});
const blockchain = new Blockchain(genesisBlock);

clientHandler(io, blockchain);

server.listen(PORT, '0.0.0.0');

module.exports = server;
