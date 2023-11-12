import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'

const Nav = ({ user }) => {
  return (
    <header>
      <h1>Wajib</h1>
      {user ? (
        <div className="user-tag">
          <AccountCircleIcon fontSize="large" />
          <h2>{user.username}</h2>
        </div>
      ) : (
        <div className="user-tag">
          <LoginIcon fontSize="large" />
          <h2>Login</h2>
        </div>
      )}
    </header>
  )
}

export default Nav
