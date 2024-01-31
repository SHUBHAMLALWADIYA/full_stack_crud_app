import React, { useState } from 'react'
import axios from "axios"
import "../cssPages/login.css"
function Login() {
    const [userLogin,setuserLogin]= useState({email:"",pass:""})
    
    const handleChange = (e)=>{
      const {name,value} = e.target
      setuserLogin({...userLogin,[name]:value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(`https://blue-green-greyhound-wear.cyclic.app/user/login`,userLogin,{withCredentials:true})
            console.log(response.data)
            
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
   // https://blue-green-greyhound-wear.cyclic.app

    <>
    <div id="loginDiv">
    <h1>Login</h1>
     <form onSubmit={handleSubmit}>
         <label htmlFor="email">
            Enter your email
         </label>
         <br />
         <input type="text" name="email" id="email" placeholder='Enter your email' value={userLogin.email} onChange={handleChange} />
         <br />
         <label htmlFor="pass">
            Enter your password
         </label>
         <br />
         <input type="text" name="pass" id="pass" placeholder='Enter your password' value={userLogin.pass} onChange={handleChange} />
         <br />
          <button type='submit'>Login</button>
     </form>
    </div>
     
    </>
  )
}

export default Login