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
    this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
  }

  handleQuestionUpdate(title, answer, distractors, id) {
    // Make create call to API here.
    let existingQuestions = this.state.questions;

    if (id !== undefined) {
      console.log('edit');
      let questionsCopy = this.state.questions.slice();
      let questionToUpdate = this.state.questions[id];
      let updatedQuestion = Object.assign(questionToUpdate, {id: id, title: title, answer: answer, distractors: distractors});
      questionsCopy[id] = updatedQuestion;
      this.setState({questions: questionsCopy});
    } else {
      console.log('create');
      let newQuestions = existingQuestions.concat({title: title, answer: answer, distractors: distractors});
      this.setState({questions: newQuestions});
    }
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
        <Questions onCreateNewQuestion={this.handleQuestionUpdate} questions={this.state.questions} />
        <CreateQuestionForm onCreateNewQuestion={this.handleQuestionUpdate} />
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
