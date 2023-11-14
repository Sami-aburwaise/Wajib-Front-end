import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'

const Nav = ({ user }) => {
  const navigate = useNavigate()

  return (
    <header>
      <h1 className='cabin'>Wajib</h1>
      {user ? (
        <div className="user-tag" onClick={() => navigate('/profile')}>
          <AccountCircleIcon fontSize="large" />
          <h2>{user.username}</h2>
        </div>
      ) : (
        <div className="user-tag" onClick={() => navigate('/Login')}>
          <LoginIcon fontSize="large" />
          <h2>Login</h2>
        </div>
      )}
    </header>
  )
}

export default Nav
