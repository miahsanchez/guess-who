# guess-who
An online guess who game 

## Development Setup

### Prerequisites
- Node.js 20+

### Install
```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### Run
Open two terminals:

```bash
# Terminal 1 - server
cd server
npm run dev

# Terminal 2 - client
cd client
npm run dev
```

- Server runs on `http://localhost:3001` (Express + Socket.IO)
- Client runs on `http://localhost:5173` (Vite + React)

Socket.IO client connects to the server and supports a simple echo test via the "Send ping" button in the UI.

