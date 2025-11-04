import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [game, setGame] = useState(null);
  const [joined, setJoined] = useState(false);

  // Listen for game state updates from the server
  useEffect(() => {
    socket.on('gameStateUpdate', (updatedGame) => {
      setGame(updatedGame);
    });

    return () => {
      socket.off('gameStateUpdate');
    };
  }, []);

  // Create a new room
  const createRoom = () => {
    if (!playerName) {
      alert('Enter a player name first');
      return;
    }

    socket.emit('createRoom', { playerName }, ({ sessionId, game }) => {
      setSessionId(sessionId);
      setGame(game);
      setJoined(true);
      console.log('Room created:', sessionId, game);
    });
  };

  // Join an existing room
  const joinRoom = () => {
    if (!playerName || !sessionId) {
      alert('Enter player name and session ID');
      return;
    }

    socket.emit('joinRoom', { sessionId, playerName }, (res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setGame(res.game);
        setJoined(true);
        console.log('Joined room:', sessionId, res.game);
      }
    });
  };

  return (
    <div className="App">
      {!joined && (
        <div>
          <h1>Guess Who Multiplayer</h1>
          <input
            placeholder="Your Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <div style={{ marginTop: '10px' }}>
            <button onClick={createRoom}>Create Room</button>
          </div>
          <div style={{ marginTop: '10px' }}>
            <input
              placeholder="Session ID"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
            />
            <button onClick={joinRoom}>Join Room</button>
          </div>
        </div>
      )}

      {joined && game && (
        <div style={{ marginTop: '20px' }}>
          <h2>Room: {game.sessionId}</h2>
          <h3>
            Players: {game.players.playerA} vs{' '}
            {game.players.playerB || 'Waiting...'}
          </h3>

          <h4>Cards:</h4>
          <ul>
            {game.cards.map((card) => (
              <li key={card.id}>
                {card.name}{' '}
                {game.eliminatedCards.playerA?.includes(card.id) ||
                game.eliminatedCards.playerB?.includes(card.id)
                  ? '(Eliminated)'
                  : ''}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
