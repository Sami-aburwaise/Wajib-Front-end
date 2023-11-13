import { useState } from 'react'
import { Client, BASE_URL } from '../Globals'
import { useNavigate } from 'react-router-dom'
import QuestionCards from './QuestionCards'
import Input from '@mui/joy/Input'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/joy/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const QuestionList = ({ selectQuestion }) => {
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [questions, setQuestions] = useState(null)

  const searchQuestion = async () => {
    if (searchQuery == '') {
      return
    }
    let response = await Client.get(
      `${BASE_URL}/question/search?search_query=${searchQuery}`
    )
    setQuestions(response.data)
  }

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const showQuesiton = async (id) => {
    await selectQuestion(id)
    navigate('./detail')
  }
  return (
    <div className="questions-container">
      <div id="search">
        <Input placeholder="Search" onChange={handleChange} />
        <IconButton variant="soft" onClick={searchQuestion}>
          <SearchIcon />
        </IconButton>
        <IconButton
          variant="soft"
          onClick={() => navigate('./add_question')}
          id="add-button"
        >
          <AddCircleIcon />
        </IconButton>
      </div>
      <QuestionCards questions={questions} showQuesiton={showQuesiton} />
    </div>
  )
}

export default QuestionList
