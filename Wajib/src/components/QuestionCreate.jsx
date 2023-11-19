import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Client, BASE_URL } from '../Globals'
import Tesseract from 'tesseract.js'

import Textarea from '@mui/joy/Textarea'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const PaperSheet = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center'
}))

const QuestionCreate = ({ selectQuestion }) => {
  const navigate = useNavigate()
  const [formState, setFromstate] = useState({
    subject: '',
    question: ''
  })
  const [file, setFile] = useState()
  const [imagePath, setImagePath] = useState('')
  const [valid, setValid] = useState(true)

  const handleImg = async (event) => {
    setFile(event.target.files[0])
    setImagePath(URL.createObjectURL(event.target.files[0]))
  }

  const img2text = () => {
    if (!imagePath) {
      return
    }
    // img to text
    Tesseract.recognize(imagePath, 'eng', {
      logger: (m) => {}
    })
      .catch((err) => {
        console.error(err)
      })
      .then((result) => {
        // Get Confidence score
        let text = result.data.text
        setFromstate({
          ...formState,
          question: formState.question + '\n' + text
        })
      })
  }

  const handleChange = (event) => {
    setFromstate({ ...formState, [event.target.name]: event.target.value })
    if (formState.subject != '' && formState.question != '') {
      setValid(false)
    } else {
      setValid(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFromstate({ ...formState, image: file.filename })

    const formData = new FormData()
    formData.append('image', file)
    formData.append('subject', formState.subject)
    formData.append('question', formState.question)
    let response = await Client.post(`${BASE_URL}/question/create`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    selectQuestion(response.data.question)
    navigate('/questions/detail')
  }

  useEffect(() => {
    img2text()
  }, [imagePath])

  return (
    <PaperSheet square={false} elevation={3} className="form-sheet">
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
        <input
          filename={file}
          onChange={(e) => handleImg(e)}
          type="file"
          accept="image/*"
        ></input>
        <div>
          <FormLabel>Question</FormLabel>
          <Textarea
            placeholder="Type your question here…"
            minRows={8}
            maxRows={16}
            name="question"
            onChange={handleChange}
            value={formState.question}
          />
        </div>
        <Button disabled={valid} type="submit">
          Submit
        </Button>
      </form>
    </PaperSheet>
  )
}

export default QuestionCreate
