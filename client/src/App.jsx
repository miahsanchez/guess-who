import { useEffect, useState } from 'react'
import { socket } from './socket'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [pong, setPong] = useState('')

  useEffect(() => {
    function onPong(message) {
      setPong(typeof message === 'object' ? JSON.stringify(message) : String(message))
    }
    socket.on('pong', onPong)
    return () => {
      socket.off('pong', onPong)
    }
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => socket.emit('ping', { pingedAt: Date.now() })}>
          Send ping
        </button>
        <div>Last pong: {pong || '—'}</div>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
