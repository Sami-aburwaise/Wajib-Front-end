import moment from 'moment'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Client, BASE_URL } from '../Globals'
import { UserContext } from '../App'
import Comments from './Comments'
import Answer from './Answer'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const PaperSheet = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center'
}))

const QuestionDetail = ({ selectQuestion, selectedQuestion }) => {
  const navigate = useNavigate()

  const user = useContext(UserContext)

  const [question, setQuestion] = useState(null)
  const getQuestion = async () => {
    let response = await Client.get(
      `${BASE_URL}/question/show/${selectedQuestion._id}`
    )
    setQuestion({ ...response.data.question, comments: response.data.comments })
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
        <PaperSheet square={false} elevation={3}>
          <div id="question-header">
            <div className="user-tag">
              <AccountCircleIcon fontSize="large" />
              <h2>{question.user.username}</h2>
            </div>
            <div id="action-bar">
              {question.user._id == user.id ? (
                <div>
                  <IconButton size="large" onClick={() => handleClick('edit')}>
                    <ModeEditOutlineIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    size="large"
                    onClick={() => handleClick('delete')}
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </div>
              ) : (
                <IconButton size="large" onClick={() => handleClick('save')}>
                  <BookmarkAddIcon fontSize="large" />
                </IconButton>
              )}
            </div>
          </div>
          <hr />
          <h1 className="section-name">Question:</h1>
          <section id="question-section">
            <h1>{question.question}</h1>
            <img
              src={question.image ? `${BASE_URL}/images/${question.image}` : ''}
              alt=""
            />
          </section>
          <p className="date">{moment(question.createdAt).fromNow()}</p>
          <hr />
          <Answer
            answer={question.answer}
            selectedQuestion={selectedQuestion}
            selectQuestion={selectQuestion}
          />
        </PaperSheet>
        <br />
        <Comments
          comments={question.comments}
          selectedQuestion={selectedQuestion}
          selectQuestion={selectQuestion}
        />
      </div>
    )
  )
}

export default QuestionDetail
