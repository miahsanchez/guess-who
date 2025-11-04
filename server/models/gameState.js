const sessions = {}; // all active sessions
const generateId = require('../utils/generateId');

function createGame(playerAName) {
  const sessionId = generateId();

  const game = {
    sessionId,
    players: { playerA: playerAName, playerB: null },
    cards: [],
    targetCards: { playerA: null, playerB: null },
    currentTurn: 'playerA',
    eliminatedCards: [],
  };

  sessions[sessionId] = game;
  return { sessionId, game };
}

module.exports = { createGame, sessions };
