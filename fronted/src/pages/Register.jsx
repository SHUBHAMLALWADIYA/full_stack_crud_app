import React, { useState } from 'react'

function Register() {
    const [userDetails,setUserDetails]= useState({userName:"",email:"",password:""})
  return (
  
    <>
     <h1>Register</h1>
     <form omSubmit={handleSubmit}>
         <label htmlFor="username">
            Enter your name
         </label>
         <input type="text" name="username" id="username" placeholder='Enter your name' />
         <label htmlFor="email">
            Enter your email
         </label>
         <input type="text" name="email" id="email" placeholder='Enter your email' />
         <label htmlFor="password">
            Enter your password
         </label>
         <input type="text" name="password" id="password" placeholder='Enter your password' />
          <button type='submit'>Register</button>
     </form>
    </>
  )
}

export default Register