import { BASE_URL } from '../Globals'
import moment from 'moment'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardOverflow from '@mui/joy/CardOverflow'
import Divider from '@mui/joy/Divider'
import Typography from '@mui/joy/Typography'

const QuestionCards = ({ questions, showQuesiton }) => {
  return (
    <div id="results-container">
      {questions &&
        questions.map((question) => (
          <Card
            variant="outlined"
            sx={{ width: 400 }}
            key={question._id}
            className="card"
            onClick={() => showQuesiton(question)}
          >
            <CardOverflow>
              <AspectRatio ratio="3">
                <img
                  src={
                    question.image
                      ? `${BASE_URL}/images/${question.image}`
                      : 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318'
                  }
                  srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography level="title-md">{question.question}</Typography>
              <Typography level="body-sm">{question.subject}</Typography>
            </CardContent>
            <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
              <Divider inset="context" />
              <CardContent orientation="horizontal">
                <Typography
                  level="body-xs"
                  fontWeight="md"
                  textColor="text.secondary"
                >
                  {question.answer ? 'answered' : 'not answered'}
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                  level="body-xs"
                  fontWeight="md"
                  textColor="text.secondary"
                >
                  {moment(question.createdAt).fromNow()}
                </Typography>
              </CardContent>
            </CardOverflow>
          </Card>
        ))}
    </div>
  )
}

export default QuestionCards
