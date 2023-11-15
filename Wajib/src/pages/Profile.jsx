import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Client, BASE_URL } from '../Globals'
import QuestionCards from '../components/QuestionCards'
import Button from '@mui/material/Button'
import { UserContext } from '../App'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const PaperSheet = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center'
}))

const Profile = ({ setUser, selectQuestion }) => {
  const navigate = useNavigate()
  const user = useContext(UserContext)
  const [userInfo, setUserInfo] = useState(null)

  const getUserInfo = async () => {
    let response = await Client.get(BASE_URL + '/user/profile')
    setUserInfo(response.data)
  }

  const showQuesiton = async (id) => {
    await selectQuestion(id)
    navigate('/questions/detail')
  }

  const logout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    userInfo && (
      <div id="profile-container">
        <PaperSheet square={false} elevation={3}>
          <section id="info-section">
            <span>
              <h1>Profile info</h1>
              <Button
                variant="outlined"
                color="error"
                onClick={logout}
                id="logout-button"
              >
                Logout
              </Button>
            </span>

            <h2>username: {userInfo.username}</h2>
            <h2>email: {userInfo.email}</h2>
          </section>
        </PaperSheet>

        <section id="questions-section">
          <hr />

          <QuestionCards
            questions={userInfo.questions}
            showQuesiton={showQuesiton}
          />
        </section>
      </div>
    )
  )
}

export default Profile
