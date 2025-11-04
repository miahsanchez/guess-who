const { Server } = require('socket.io');
const gameEvents = require('./game');

module.exports = function (server) {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  io.on('connection', (socket) => {
    console.log('Client connected', socket.id);

    gameEvents(socket, io);
    // console.log('Client connected', socket.id);
    // // gameEvents(socket, io);

    // socket.on('ping', (payload) => {
    //   socket.emit('pong', payload ?? { time: Date.now() });
    // });
  });
};
