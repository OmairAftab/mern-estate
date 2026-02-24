import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign Up
      </h1>
    

    <form className='flex flex-col gap-4 max-w-lg mx-auto'>
      <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg bg-white' />
      <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg  bg-white' />
      <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg  bg-white' />
    
      <button className='bg-slate-600 p-2 cursor-pointer text-white rounded-lg hover:bg-slate-500  disabled:opacity-80'> 
        SIGN UP
      </button>

    </form> 



    <div className='flex gap-2 text-center max-w-lg mx-auto my-2'>
      <p> Have an account?  </p>
      <span className='text-blue-500 underline'><Link to={'/sign-in'}>Sign in</Link> </span>
    </div>



    </div>
  )
}

export default SignUp