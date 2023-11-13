import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Client, BASE_URL } from '../Globals'
import Textarea from '@mui/joy/Textarea'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'

import Button from '@mui/joy/Button'

const QuestionEdit = ({ selectedQuestion }) => {
  const navigate = useNavigate()

  const [formState, setFromstate] = useState({
    subject: selectedQuestion.subject,
    question: selectedQuestion.question
  })

  const [valid, setValid] = useState(true)

  const handleChange = (event) => {
    setFromstate({ ...formState, [event.target.name]: event.target.value })
    if (formState.username != '' && formState.password != '') {
      setValid(false)
    } else {
      setValid(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let response = await Client.post(
      `${BASE_URL}/question/update/${selectedQuestion._id}`,
      formState
    )
    navigate('/questions/detail')
  }
  return (
    <div>
      <h1>Edit question</h1>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div>
          <FormLabel>Subject</FormLabel>
          <Input
            placeholder="ex: math, physics ..."
            name="subject"
            onChange={handleChange}
            value={formState.subject}
          />
        </div>

        <div>
          <FormLabel>Question</FormLabel>
          <Textarea
            placeholder="Type your question here…"
            minRows={8}
            maxRows={16}
            name="question"
            value={formState.question}
            onChange={handleChange}
          />
        </div>
        <Button disabled={valid} type="submit">
          Update
        </Button>
      </form>
    </div>
  )
}

export default QuestionEdit
