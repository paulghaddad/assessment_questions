const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Questions = require('./questions.jsx');
const CreateQuestionForm = require('./create_question_form.jsx');

const AppTitle = () => {
  return <h1>All Questions</h1>
};

const AppDescription = () => {
  return <p>Click on a question to see its possible answers</p>
};

const QUESTIONS = [
  { id: 0, title: "What is 7343 6708?", answer: "635", distractors: ["688", "7171", "7023"] },
  { id: 1, title: "What is your name?", answer: "Paul", distractors: ["Steve", "Bob", "Richard"] }
 ];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {questions: QUESTIONS};
    this.handleNewQuestion = this.handleNewQuestion.bind(this);
  }

  handleNewQuestion(title, answer, distractors) {
    // Make create call to API here.
    let newQuestions = this.state.questions;

    newQuestions.push({title: title, answer: answer, distractors: distractors});
    this.setState({questions: newQuestions});
  }

  // componentDidMount() {
  //   axios.get('http://localhost:4567/questions')
  //   .then(response => {
  //     console.log(response);
  //     this.setState({
  //       questions: response.data
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //
  // }

  componentWillUnmount() {
    this.serverRequest.abort();
  }


  render() {
    return (
      <div>
        <AppTitle />
        <AppDescription />
        <Questions questions={this.state.questions} />
        <CreateQuestionForm onCreateNewQuestion={this.handleNewQuestion} />
      </div>
    )
  }
}

ReactDOM.render((
  <Router>
    <Route path='/' component={App}>
    </Route>
  </Router>
), document.querySelector('#main'))
