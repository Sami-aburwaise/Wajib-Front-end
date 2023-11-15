import axios from 'axios'
import { BASE_URL } from '../Globals'
import { useState,useEffect } from 'react'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import { useNavigate } from 'react-router-dom'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const PaperSheet = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center'
}))

const Login = ({ setUser }) => {
  const navigate = useNavigate()

  const [formState, setFromstate] = useState({
    username: '',
    password: ''
  })

  const [valid, setValid] = useState(true)

  const handleChange = (event) => {
    setFromstate({ ...formState, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let response = await axios.post(`${BASE_URL}/user/login`, formState)
    if (response.data.user) {
      setUser(response.data.user)
      navigate('/')
    } else {
      setFromstate({
        ...formState,
        password: ''
      })
    }
    localStorage.setItem('token', response.data.token) //  store token in local storage
  }

  const checkForm = () => {
    if (formState.username != '' && formState.password != '') {
      setValid(false)
    } else {
      setValid(true)
    }
  }

  useEffect(() => {
    checkForm()
  }, [formState])

  return (
    <PaperSheet square={false} elevation="3" className="form-sheet">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <FormLabel>username</FormLabel>
          <Input
            placeholder="username"
            name="username"
            onChange={handleChange}
            value={formState.username}
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
        <Button disabled={valid} type="submit">
          Login
        </Button>
      </form>
    </PaperSheet>
  )
}

export default Login
