import { useState } from 'react'
import { Client, BASE_URL } from '../Globals'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Input from '@mui/joy/Input'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardOverflow from '@mui/joy/CardOverflow'
import Divider from '@mui/joy/Divider'
import Typography from '@mui/joy/Typography'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/joy/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const QuestionList = ({ selectQuestion }) => {
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [questions, setQuestions] = useState(null)

  const searchQuestion = async () => {
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
    <div id="questions-container">
      <div id="search">
        <Input placeholder="Search" onChange={handleChange} />
        <IconButton variant="soft" onClick={searchQuestion}>
          <SearchIcon />
        </IconButton>
        <IconButton variant="soft" onClick={searchQuestion} id="add-button">
          <AddCircleIcon />
        </IconButton>
      </div>

      <div id="results-container">
        {questions &&
          questions.map((question) => (
            <Card
              variant="outlined"
              sx={{ width: 400 }}
              key={question._id}
              className="card"
              onClick={() => showQuesiton(question._id)}
            >
              <CardOverflow>
                <AspectRatio ratio="3">
                  <img
                    src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                    srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">{question.question}</Typography>
                <Typography level="body-sm">{question.subject}</Typography>
              </CardContent>
              <CardOverflow
                variant="soft"
                sx={{ bgcolor: 'background.level1' }}
              >
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                  <Typography
                    level="body-xs"
                    fontWeight="md"
                    textColor="text.secondary"
                  >
                    6.3k views
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography
                    level="body-xs"
                    fontWeight="md"
                    textColor="text.secondary"
                  >
                    {moment(question.createdAt).fromNow()}
                  </Typography>
                </CardContent>
              </CardOverflow>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default QuestionList
