import React from 'react'

const Profile = () => {

  const storedUser = localStorage.getItem('currentUser')
  const currentUser = storedUser ? JSON.parse(storedUser) : null
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-5 max-w-lg mx-auto'>
        <img src={currentUser.avatar} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' alt="" />

        <input type="text" placeholder='username' id='username' className='bg-white p-3  rounded-lg'  />

        <input type="email" placeholder='email' id='email' className='bg-white p-3  rounded-lg'  />

        <input type="password" placeholder='password' id='password' className='bg-white p-3  rounded-lg'  />

        <button className=' bg-slate-700 hover:bg-slate-500 text-white rounded-xl p-3' > UPDATE </button>

      </form>

      <div className='flex justify-between'>
        <span className='text-red-700 mt-3'> Delete Account</span>
        <span className='text-red-700 mt-3'> Sign Out</span>
      </div>
    </div>
  )
}

export default Profile