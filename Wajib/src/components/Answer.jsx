import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { Client, BASE_URL } from '../Globals'
import Textarea from '@mui/joy/Textarea'
import FormLabel from '@mui/joy/FormLabel'
import Button from '@mui/joy/Button'

const Answer = ({ answer, selectedQuestion, selectQuestion }) => {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  const [formState, setFromstate] = useState({
    answer: ''
  })

  const [valid, setValid] = useState(true)

  const handleChange = (event) => {
    setFromstate({ ...formState, [event.target.name]: event.target.value })
    if (formState.answer != '') {
      setValid(false)
    } else {
      setValid(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let response = await Client.post(
      `${BASE_URL}/answer/post/${selectedQuestion._id}`,
      formState
    )
    selectQuestion(response.data.question)
    navigate('/questions/detail')
  }

  if (!answer) {
    return (
      <section id="answer-section">
        {user.canAnswer ? (
          <form action="" method="post" onSubmit={handleSubmit}>
            <div>
              <FormLabel>Answer</FormLabel>
              <Textarea
                placeholder="Type your answer here…"
                minRows={8}
                maxRows={16}
                name="answer"
                onChange={handleChange}
              />
            </div>
            <Button disabled={valid} type="submit">
              Submit
            </Button>
          </form>
        ) : (
          <h3>Not answered</h3>
        )}
      </section>
    )
  } else {
    return (
      <section id="answer-section">
        <h2>{answer.answer}</h2>
        <img src={answer.image} alt="" />
      </section>
    )
  }
}

export default Answer
