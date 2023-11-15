import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const PaperSheet = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center'
}))

const Home = () => {
  return (
    <PaperSheet square={false} elevation={3}>
      <h1 className="cabin" id="title">
        Wajib
      </h1>
      <h1>Get your homeworks solved</h1>
    </PaperSheet>
  )
}

export default Home
