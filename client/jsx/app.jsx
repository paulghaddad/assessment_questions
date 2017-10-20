const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { PageHeader } from 'react-bootstrap';

import Questions from './questions.jsx';
import QuestionForm from './question_form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {questions: []};
    this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
    this.handleQuestionRequest = this.handleQuestionRequest.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
  }

  handleQuestionUpdate(title, answer, distractors, id) {
    let existingQuestions = this.state.questions;

    if (id !== undefined) {
      console.log('edit');
      this.updateQuestion(id, title, answer, distractors);
      // let questionsCopy = this.state.questions.slice();
      // let questionToUpdate = this.state.questions[id];
      // let updatedQuestion = Object.assign(questionToUpdate, {id: id, title: title, answer: answer, distractors: distractors});
      // questionsCopy[id] = updatedQuestion;
      // this.setState({questions: questionsCopy});
    } else {
      console.log('create');
      this.createQuestion(title, answer, distractors);
    }
  }

  handleQuestionRequest(id) {
    console.log('Question requested', id);
    let updatedQuestions = this.state.questions.slice();
    axios.get('http://localhost:4567/questions/' + id)
    .then(response => {
      console.log(response);
      updatedQuestions[id - 1] = response.data;
      this.setState({
        questions: updatedQuestions
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  createQuestion(title, answer, distractors) {
    console.log('Question creation', title, answer, distractors);
    axios.post('http://localhost:4567/questions', {
      title: title,
      answer: answer,
      distractors: distractors
    })
    .then(response => {
      console.log('created!');
      console.log(response.headers);
      let location = response.headers.location;
      console.log(location);
      this.handleQuestionRequest(location.match(/\d+$/)[0]);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateQuestion(id, title, answer, distractors) {
    console.log('Question update', id, title, answer, distractors);
    axios.patch(`http://localhost:4567/questions/${id}`, {
      id: id,
      title: title,
      answer: answer,
      distractors: distractors
    })
    .then(response => {
      console.log('updated!');
      this.handleQuestionRequest(response.data.id);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    axios.get('http://localhost:4567/questions')
    .then(response => {
      console.log(response);
      this.setState({
        questions: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <div>
        <PageHeader className="text-center">Pluralsight Skill IQ<small> All our questions</small></PageHeader>
        <QuestionForm onQuestionChange={this.handleQuestionUpdate} action="Create" style={{marginBotton: "5em"}} />
        <Questions onQuestionChange={this.handleQuestionUpdate}
                   onShowQuestion={this.handleQuestionRequest}
                   questions={this.state.questions} />
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
