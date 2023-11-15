import axios from 'axios'
import { BASE_URL } from '../Globals'
import { useEffect, useState } from 'react'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/joy/Button'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const PaperSheet = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center'
}))

const SignUp = () => {
  const navigate = useNavigate()

  const [formState, setFromstate] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [valid, setValid] = useState(false)

  const handleChange = async (event) => {
    await setFromstate({
      ...formState,
      [event.target.name]: event.target.value
    })
  }

  const checkForm = () => {
    if (
      formState.username == '' ||
      formState.email == '' ||
      formState.password == '' ||
      formState.confirmPassword == '' ||
      formState.password != formState.confirmPassword
    ) {
      setValid(false)
    } else {
      setValid(true)
    }
  }

  useEffect(() => {
    checkForm()
  }, [formState])

  const handleSubmit = async (event) => {
    event.preventDefault()
    let response = await axios.post(`${BASE_URL}/user/signup`, formState)
    if (response.data.status == 'ok') {
      navigate('/login')
    } else {
      setFromstate({ ...formState, password: '', confirmPassword: '' })
    }
  }

  return (
    <PaperSheet square={false} elevation={3} className="form-sheet">
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Sign up</h1>
          <FormLabel>username</FormLabel>
          <Input
            placeholder="username"
            name="username"
            onChange={handleChange}
            value={formState.username}
          />
        </div>
        <div>
          <FormLabel>email</FormLabel>
          <Input
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={formState.email}
          />
        </div>
        <div>
          <FormLabel>password</FormLabel>
          <Input
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={formState.password}
          />
        </div>
        <div>
          <FormLabel>confirm password</FormLabel>
          <Input
            placeholder="confirm password"
            name="confirmPassword"
            onChange={handleChange}
            value={formState.confirmPassword}
            error={
              formState.password != formState.confirmPassword &&
              formState.confirmPassword != ''
            }
          />
        </div>
        <Button disabled={!valid} type="submit">
          sign up
        </Button>
      </form>
    </PaperSheet>
  )
}

export default SignUp
