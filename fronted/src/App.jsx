import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'
import AllRoutes from './routes/AllRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Link to="/" >Home</Link>
      <Link to="/login" >Login</Link>
      <Link to="/register" >Register</Link>
      <AllRoutes/>
    </>
  )
}

export default App
