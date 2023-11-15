import axios from 'axios'
import moment from 'moment'
import QuestionList from '../components/QuestionList'
import QuestionDetail from '../components/QuestionDetail'
import QuestionCreate from '../components/QuestionCreate'
import QuestionEdit from '../components/QuestionEdit'
import { BASE_URL, Client } from '../Globals'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

const Questions = ({ selectedQuestion, selectQuestion, notify }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<QuestionList selectQuestion={selectQuestion} />}
      />
      <Route
        path="/detail"
        element={
          <QuestionDetail
            selectedQuestion={selectedQuestion}
            selectQuestion={selectQuestion}
          />
        }
      />
      <Route
        path="/add_question"
        element={
          <QuestionCreate selectQuestion={selectQuestion} notify={notify} />
        }
      />
      <Route
        path="/edit_question"
        element={<QuestionEdit selectedQuestion={selectedQuestion} />}
      />
    </Routes>
  )
}

export default Questions
