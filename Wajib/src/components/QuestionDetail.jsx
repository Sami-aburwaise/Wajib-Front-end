import { useEffect, useState } from 'react'
import { Client, BASE_URL } from '../Globals'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import moment from 'moment'

const QuestionDetail = ({ selectedQuestion }) => {
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
