import HomeIcon from '@mui/icons-material/Home'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import HistoryIcon from '@mui/icons-material/History'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { NavLink } from 'react-router-dom'

const SideBar = ({ user }) => {
  return (
    <aside>
      <div id="links-container">
        <NavLink to="/" className="sideBar-link">
          <HomeIcon fontSize="large" />
          <h2>Home</h2>
        </NavLink>
        <NavLink to="/questions" className="sideBar-link">
          <ContentPasteSearchIcon fontSize="large" />
          <h2>Questions</h2>
        </NavLink>
        {user && (
          <NavLink className="sideBar-link">
            <BookmarkIcon fontSize="large" />
            <h2>Saves</h2>
          </NavLink>
        )}
        {user && (
          <NavLink className="sideBar-link">
            <HistoryIcon fontSize="large" />
            <h2>History</h2>
          </NavLink>
        )}
        {!user && (
          <NavLink to="/Login" className="sideBar-link">
            <LoginIcon fontSize="large" />
            <h2>Login</h2>
          </NavLink>
        )}
        {!user && (
          <NavLink to="/Signup" className="sideBar-link">
            <PersonAddIcon fontSize="large" />
            <h2>Sign up</h2>
          </NavLink>
        )}
      </div>
    </aside>
  )
}

export default SideBar
