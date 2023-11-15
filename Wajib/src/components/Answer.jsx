import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { Client, BASE_URL } from '../Globals'
import Textarea from '@mui/joy/Textarea'
import FormLabel from '@mui/joy/FormLabel'
import Button from '@mui/material/Button'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import ReportIcon from '@mui/icons-material/Report'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Answer = ({ answer, selectedQuestion, selectQuestion }) => {
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const [isEdit, setEdit] = useState(false)

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

  const deleteAnswer = async () => {
    let response = await Client.get(`${BASE_URL}/answer/delete/${answer._id}`)
    selectQuestion({ ...selectedQuestion, answer: null })
  }

  const editAnswer = () => {
    setEdit(true)
    setFromstate({ ...formState, answer: answer.answer })
  }

  const reportAnswer = async () => {
    let response = await Client.get(`${BASE_URL}/answer/report/${answer._id}`)
    selectQuestion({ ...selectedQuestion, answer: response.data.answer })
  }

  const handleClick = (action) => {
    switch (action) {
      case 'delete':
        deleteAnswer()
        break
      case 'report':
        reportAnswer()
        break
      case 'edit':
        editAnswer()
        break
      default:
        break
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let URL = isEdit
      ? `${BASE_URL}/answer/update/${answer._id}`
      : `${BASE_URL}/answer/post/${selectedQuestion._id}`
    let response = await Client.post(URL, formState)

    if (isEdit) {
      selectQuestion({ ...selectedQuestion, answer: response.data.answer })
      setFromstate({})
      setEdit(false)
    } else {
      selectQuestion(response.data.question)
    }
  }

  if (!answer || isEdit) {
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
                defaultValue={formState.answer}
              />
            </div>
            <Button
              disabled={valid}
              type="submit"
              color="success"
              variant="contained"
            >
              Submit
            </Button>
          </form>
        ) : (
          <p id="no-section">Not answered</p>
        )}
      </section>
    )
  } else {
    return (
      <section id="answer-section">
        <div id="answer-header">
          <div className="user-tag">
            <AccountCircleIcon fontSize="large" />
            <h2>{answer.user.username}</h2>
          </div>
          <div id="action-bar">
            {answer.user._id == user.id ? (
              <div>
                <IconButton size="large" onClick={() => handleClick('edit')}>
                  <ModeEditOutlineIcon fontSize="large" />
                </IconButton>
                <IconButton size="large" onClick={() => handleClick('delete')}>
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </div>
            ) : (
              <div>
                {answer.status == 'reported' ? (
                  <p id="ans-status">Ansewer Reported</p>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => handleClick('report')}
                    color="error"
                    startIcon={<ReportIcon />}
                  >
                    Report
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        <section id="answer-section">
          <h2>{answer.answer}</h2>
          <img src={answer.image} alt="" />
        </section>
      </section>
    )
  }
}

export default Answer
