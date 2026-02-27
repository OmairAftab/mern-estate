import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// allow axios to send and receive cookies by default
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>,
)
