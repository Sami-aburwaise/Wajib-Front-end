import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Questions from './pages/Questions'
import Profile from './pages/Profile'
import Nav from './components/Nav'
import SideBar from './components/SideBar'
import Footer from './components/Footer'
import { useEffect, useState, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { Client, BASE_URL } from './Globals'
import './App.css'
import './css/profile.css'
import './css/questions.css'

export const UserContext = createContext()

const App = () => {
  const [user, setUser] = useState(null)

  const checkSession = async () => {
    try {
      const response = await Client.get(BASE_URL + '/user/session')
      return response.data
    } catch (error) {
      throw error
    }
  }

  const checkToken = async () => {
    const user = await checkSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <UserContext.Provider value={user}>
      <div>
        <Nav user={user} />
        <SideBar user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/Login" element={<Login setUser={setUser} />} />
            <Route path="/profile" element={<Profile setUser={setUser} />} />
            <Route path="/questions//*" element={<Questions />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </UserContext.Provider>
  )
}

export default App
