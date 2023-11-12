import { useEffect, useState } from 'react'
import { Client, BASE_URL } from '../Globals'

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
        <h2>{question.user.username}</h2>
        <h2>{question.question}</h2>
        <h3>{question.subject}</h3>
      </div>
    )
  )
}

export default QuestionDetail
