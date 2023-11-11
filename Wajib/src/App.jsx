import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Questions from './pages/Questions'
import Nav from './components/Nav'
import SideBar from './components/SideBar'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await checkSession()
    await setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <Nav />
      <SideBar user={user} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Login" element={<Login setUser={setUser} />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
