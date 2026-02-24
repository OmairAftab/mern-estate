import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import SignUp from './Pages/SignUp'
import About from './Pages/About'
import Profile from './Pages/Profile'
import Header from './Components/Header'

function App() {

  return (
    <>
    <Header />
     <Routes>
       <Route path='/' element={<Home />}></Route>
       <Route path='sign-in' element={<Signin />}></Route>
       <Route path='sign-up' element={<SignUp />}></Route>
       <Route path='/about' element={<About />}></Route>
       <Route path='/profile' element={<Profile />}></Route>
     </Routes>
    </>
  )
}

export default App
