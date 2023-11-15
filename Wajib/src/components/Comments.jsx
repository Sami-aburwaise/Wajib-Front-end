import { useEffect, useState, useContext } from 'react'
import FormLabel from '@mui/joy/FormLabel'
import { UserContext } from '../App'
import { Client, BASE_URL } from '../Globals'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import IconButton from '@mui/material/IconButton'

import DeleteIcon from '@mui/icons-material/Delete'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const PaperSheet = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center'
}))

const Comments = ({ comments, selectQuestion, selectedQuestion }) => {
  const user = useContext(UserContext)
  const [formState, setFromstate] = useState({
    comment: ''
  })
  const handleChange = (event) => {
    setFromstate({ ...formState, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    if (formState.comment == '') {
      return
    }
    let response = await Client.post(
      `${BASE_URL}/comment/post/${selectedQuestion._id}`,
      formState
    )
    setFromstate({ comment: '' })
    selectQuestion({
      ...selectedQuestion,
      comments: [...comments, response.data.comment.comment]
    })
  }

  const deleteComment = async (id) => {
    let response = await Client.get(`${BASE_URL}/comment/delete/${id}`)
    if (response.data.status == 'ok') {
      selectQuestion({ ...selectedQuestion, comments: [] })
    }
  }

  return (
    <PaperSheet square={false} elevation={3}>
      <div id="comment-form">
        <Input
          placeholder="comment"
          name="comment"
          onChange={handleChange}
          value={formState.comment}
        />
        <Button
          disabled={formState.comment == ''}
          type="submit"
          onClick={handleSubmit}
        >
          post
        </Button>
      </div>

      <section id="comments-section">
        <div id="comments-container">
          {comments ? (
            comments.reverse().map((comment) => (
              <div className="comment" key={comment._id}>
                <div className="user-tag">
                  <AccountCircleIcon fontSize="large" />
                  <h2>{comment.user.username}</h2>
                  {user.id == comment.user._id && (
                    <div className="action-bar">
                      <IconButton
                        size="small"
                        onClick={() => deleteComment(comment._id)}
                        className="delete-button"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  )}
                </div>
                <h3>{comment.comment}</h3>
              </div>
            ))
          ) : (
            <p>no comments</p>
          )}
        </div>
      </section>
    </PaperSheet>
  )
}

export default Comments
