const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: CLIENT_ORIGIN, methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  console.log('Client connected', socket.id);

  socket.on('ping', (payload) => {
    socket.emit('pong', payload ?? { time: Date.now() });
  });

  socket.on('disconnect', (reason) => {
    console.log('Client disconnected', socket.id, reason);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


