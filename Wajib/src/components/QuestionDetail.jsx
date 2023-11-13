import moment from 'moment'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Client, BASE_URL } from '../Globals'
import { UserContext } from '../App'
import Answer from './Answer'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

const QuestionDetail = ({ selectQuestion, selectedQuestion }) => {
  const navigate = useNavigate()

  const user = useContext(UserContext)

  const [question, setQuestion] = useState(null)
  const getQuestion = async () => {
    let response = await Client.get(
      `${BASE_URL}/question/show/${selectedQuestion._id}`
    )
    setQuestion(response.data._doc)
  }

  const deleteQuestion = async () => {
    let response = await Client.get(
      `${BASE_URL}/question/delete/${question._id}`
    )
    response.data.status == 'ok' && navigate('/questions')
  }

  const handleClick = (action) => {
    switch (action) {
      case 'delete':
        deleteQuestion()
        break
      case 'save':
        console.log('save')
        break
      case 'edit':
        navigate('/questions/edit_question')
        break
      default:
        break
    }
  }

  useEffect(() => {
    getQuestion()
  }, [selectedQuestion])

  return (
    question && (
      <div id="question-detail">
        <div id="question-header">
          <div className="user-tag">
            <AccountCircleIcon fontSize="large" />
            <h2>{question.user.username}</h2>
          </div>
          <p>{moment(question.createdAt).fromNow()}</p>
        </div>

        <hr />
        <div id="action-bar">
          {question.user._id == user.id ? (
            <div>
              <IconButton size="large" onClick={() => handleClick('edit')}>
                <ModeEditOutlineIcon fontSize="large" />
              </IconButton>
              <IconButton size="large" onClick={() => handleClick('delete')}>
                <DeleteIcon fontSize="large" />
              </IconButton>
            </div>
          ) : (
            <IconButton size="large" onClick={() => handleClick('save')}>
              <BookmarkAddIcon fontSize="large" />
            </IconButton>
          )}
        </div>
        <section id="question-section">
          <div>
            <h1>Question:</h1>
            <h1>{question.question}</h1>
          </div>
          <img
            src={
              question.image
                ? question.image
                : 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318'
            }
            alt=""
          />
        </section>
        <hr />
        <h2>Answer:</h2>
        <Answer
          answer={question.answer}
          selectedQuestion={selectedQuestion}
          selectQuestion={selectQuestion}
        />

        <section id="comments-section">no comments</section>
      </div>
    )
  )
}

export default QuestionDetail
