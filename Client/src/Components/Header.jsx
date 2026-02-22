import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
 
  return (
    <header className='bg-slate-300'>

      <div className='max-w-6xl mx-auto flex justify-between items-center py-3'>

    <Link to='/'>
      <h1 className='text-3xl font-bold'>
        <span className='text-slate-600'>Bech</span>
        <span className='text-slate-800'>Do</span>
      </h1>
    </Link>



  
      <form className='bg-slate-100 p-1 rounded-lg flex justify-center items-center w-24 sm:w-64 '>
        <input className='px-3 py-2 rounded  bg-transparent outline-none border-none' type="text" placeholder='Search...' />
        {/* //REACT K ICONS KI LIBRARY INSTALL KI ( NPM I REACT-ICONS ) PHIR US KO TOP PE IMPORT KIYA AND YAHAN USE KR LIYA AS A COMPONENT FASEARCH*/}
        <FaSearch className='text-slate-600'/> 
      </form>



      <ul className='flex gap-3'>
{/* home and about ko mobile main show nhi krana  */}
        <Link to='/'> <li className='hidden sm:inline hover:underline cursor-pointer'>Home</li> </Link> 
        <Link to='/about'>  <li className='hidden sm:inline hover:underline  cursor-pointer'>About</li> </Link> 
        <Link to='/sign-in'> <li className=' cursor-pointer hover:underline'>Sign in</li> </Link> 
      </ul>

      </div>
    </header>
  )
}

export default Header