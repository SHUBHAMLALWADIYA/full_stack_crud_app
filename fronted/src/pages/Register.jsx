import React, { useState } from 'react'
import axios from "axios"

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
     <h1>Register</h1>
     <form onSubmit={handleSubmit}>
         <label htmlFor="username">
            Enter your name
         </label>
         <input type="text" name="username" id="username" placeholder='Enter your name' value={userDetails.username} onChange={handleChange} />
         <label htmlFor="email">
            Enter your email
         </label>
         <input type="text" name="email" id="email" placeholder='Enter your email' value={userDetails.email} onChange={handleChange} />
         <label htmlFor="pass">
            Enter your password
         </label>
         <input type="text" name="pass" id="pass" placeholder='Enter your password' value={userDetails.pass} onChange={handleChange} />
          <button type='submit'>Register</button>
     </form>
    </>
  )
}

export default Register