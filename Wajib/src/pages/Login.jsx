import axios from 'axios'
import { BASE_URL } from '../Globals'
import { useState } from 'react'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'

const Login = ({ setUser }) => {
  const [formState, setFromstate] = useState({
    username: '',
    password: ''
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
    let response = await axios.post(`${BASE_URL}/user/login`, formState)
    console.log(response)
    setUser(response.data.user)
    localStorage.setItem('token', response.data.token) //  store token in local storage
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <FormLabel>username</FormLabel>
      <Input
        placeholder="username"
        name="username"
        onChange={handleChange}
        value={formState.username}
      />
      <FormLabel>password</FormLabel>
      <Input
        placeholder="password"
        name="password"
        onChange={handleChange}
        value={formState.password}
      />

      <Button disabled={valid} type="submit">
        Login
      </Button>
    </form>
  )
}

export default Login
