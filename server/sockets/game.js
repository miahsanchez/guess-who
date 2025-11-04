const { createGame } = require('../models/gameState');

module.exports = function (socket, io) {
  socket.on('createRoom', ({ playerName }, callback) => {
    const { sessionId, game } = createGame(playerName);
    socket.join(sessionId);
    console.log(`Room Created: ${sessionId} by ${playerName}`);
    callback({ sessionId, game });
  });
};
