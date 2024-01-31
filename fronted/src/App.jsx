
import './App.css'
import { Link } from 'react-router-dom'
import AllRoutes from './routes/AllRoutes'

function App() {


  return (
    <>
    <div style={{fontSize:"25px",display:'flex',alignItems:"center",justifyContent:"space-around",margin:"10px",border:"2px solid black",padding:"10px"}}>
    <Link to="/" >Home</Link>
      <Link to="/login" >Login</Link>
      <Link to="/register" >Register</Link>
      
    </div>
    <AllRoutes/>
      
    </>
  )
}

export default App
