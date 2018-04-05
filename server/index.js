const Koa = require('koa');
const serve = require('koa-static');
const clientHandler = require('./clientHandler')

const app = new Koa();
app.use(serve('./build'));

const PORT = process.env.PORT || 1337;
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
clientHandler(io)

server.listen(PORT, '0.0.0.0')
module.exports = server;

