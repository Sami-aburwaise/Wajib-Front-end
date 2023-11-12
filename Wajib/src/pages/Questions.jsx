import axios from 'axios'
import moment from 'moment'
import QuestionList from '../components/QuestionList'
import QuestionDetail from '../components/QuestionDetail'
import { BASE_URL, Client } from '../Globals'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

const Questions = () => {
  const [selectedQuestion, selectQuestion] = useState(null)

  return (
    <Routes>
      <Route
        path="/"
        element={<QuestionList selectQuestion={selectQuestion} />}
      />
      <Route
        path="/detail"
        element={<QuestionDetail selectedQuestion={selectedQuestion} />}
      />
    </Routes>
  )
}

export default Questions
