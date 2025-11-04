const express = require('express');
const http = require('http');
// const cors = require('./config/cors');
const socketHandler = require('./sockets');

const PORT = process.env.PORT || 3001;

const app = express();
// app.use(cors);
app.use(express.json());

// Routes
// app.use('/health', require('./routes/health'));

// HTTP + Socket.IO
const server = http.createServer(app);
socketHandler(server);

server.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
