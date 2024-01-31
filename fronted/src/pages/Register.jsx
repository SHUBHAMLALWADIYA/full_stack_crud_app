import React, { useState } from 'react'
import axios from "axios"
import "../cssPages/register.css"


function Register() {
    const [userDetails,setUserDetails]= useState({username:"",email:"",pass:""})
    
    const handleChange = (e)=>{
      const {name,value} = e.target
     setUserDetails({...userDetails,[name]:value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(`https://blue-green-greyhound-wear.cyclic.app/user/register`,userDetails,{withCredentials:true})
            console.log(response.data)
            
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
   // https://blue-green-greyhound-wear.cyclic.app

    <>
    <div id="registerDiv">
    <h1>Register</h1>
     <form onSubmit={handleSubmit}>
         <label htmlFor="username">
            Enter your name
         </label>
         <br />
         <input type="text" name="username" id="username" placeholder='Enter your name' value={userDetails.username} onChange={handleChange} />
         <br />
         <label htmlFor="email">
            Enter your email
         </label>
         <br />
         <input type="text" name="email" id="email" placeholder='Enter your email' value={userDetails.email} onChange={handleChange} />
         <br />
         <label htmlFor="pass">
            Enter your password
         </label>
         <br />
         <input type="text" name="pass" id="pass" placeholder='Enter your password' value={userDetails.pass} onChange={handleChange} />
         <br />
          <button type='submit'>Register</button>
     </form>
    </div>
     
    </>
  )
}

export default Register