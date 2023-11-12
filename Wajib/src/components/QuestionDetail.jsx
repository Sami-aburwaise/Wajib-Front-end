import moment from 'moment'
import { useEffect, useState, useContext } from 'react'
import { Client, BASE_URL } from '../Globals'
import { UserContext } from '../App'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

const QuestionDetail = ({ selectedQuestion }) => {
  const user = useContext(UserContext)

  const [question, setQuestion] = useState(null)
  const getQuestion = async () => {
    let response = await Client.get(
      `${BASE_URL}/question/show/${selectedQuestion}`
    )
    console.log(response)
    setQuestion(response.data._doc)
  }

  useEffect(() => {
    getQuestion()
  }, [])

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
              <IconButton size="large">
                <ModeEditOutlineIcon fontSize="large" />
              </IconButton>
              <IconButton size="large">
                <DeleteIcon fontSize="large" />
              </IconButton>
            </div>
          ) : (
            <IconButton size="large">
              <BookmarkAddIcon fontSize="large" />
            </IconButton>
          )}
        </div>
        <section id="question-container">
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
        <section>
          <h2>no answered</h2>
        </section>
        <section>no comments</section>
      </div>
    )
  )
}

export default QuestionDetail
