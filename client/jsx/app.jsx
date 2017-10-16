const React = require('react');
const ReactDOM = require('react-dom');

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Questions = require('./questions.jsx');

const QUESTIONS = [
  { id: 0, title: "What is 7343 6708?", answer: "635",
    distractors: ["688", "7171", "7023"] },
  { id: 1, title: "What is your name?", answer: "Paul",
    distractors: ["Steve", "Bob", "Richard"] }
];

const AppTitle = () => {
  return <h1>All Questions</h1>
};

const AppDescription = () => {
  return <p>Click on a question to see its possible answers</p>
};

const App = () => (
  <div>
    <AppTitle />
    <AppDescription />
    <Questions questions={QUESTIONS} />
  </div>
)

ReactDOM.render((
  <Router>
    <Route path='/' component={App}>
    </Route>
  </Router>
), document.querySelector('#main'))
