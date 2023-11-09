import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'

const App = () => {
  const [user, setUser] = useState({})

  useEffect(() => {}, [])

  return (
    <div>
      <header>
        <Nav />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Login" element={<Login setUser={setUser} />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
