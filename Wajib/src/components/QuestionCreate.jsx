import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Client, BASE_URL } from '../Globals'
import Textarea from '@mui/joy/Textarea'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'

import Button from '@mui/joy/Button'

const QuestionCreate = ({ selectQuestion }) => {
  const navigate = useNavigate()

  const [formState, setFromstate] = useState({
    subject: '',
    question: ''
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
    let response = await Client.post(`${BASE_URL}/question/create`, formState)
    selectQuestion(response.data.question)
    navigate('/questions/detail')
  }
  return (
    <div>
      <h1>New question</h1>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div>
          <FormLabel>Subject</FormLabel>
          <Input
            placeholder="ex: math, physics ..."
            name="subject"
            onChange={handleChange}
            value={formState.password}
          />
        </div>

        <div>
          <FormLabel>Question</FormLabel>
          <Textarea
            placeholder="Type your question here…"
            minRows={8}
            maxRows={16}
            name="question"
            onChange={handleChange}
          />
        </div>
        <Button disabled={valid} type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default QuestionCreate
