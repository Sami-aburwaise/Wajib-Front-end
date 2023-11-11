import HomeIcon from '@mui/icons-material/Home'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import HistoryIcon from '@mui/icons-material/History'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <aside>
      <NavLink to="/" className="sideBar-link">
        <HomeIcon fontSize="large" />
        <h2>Home</h2>
      </NavLink>
      <NavLink to="/questions" className="sideBar-link">
        <ContentPasteSearchIcon fontSize="large" />
        <h2>Questions</h2>
      </NavLink>
      <NavLink className="sideBar-link">
        <BookmarkIcon fontSize="large" />
        <h2>Saves</h2>
      </NavLink>
      <NavLink className="sideBar-link">
        <HistoryIcon fontSize="large" />
        <h2>History</h2>
      </NavLink>
    </aside>
  )
}

export default SideBar
