const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

let questionsApiBaseUrl;

// questionsApiBaseUrl = 'https://infinite-lowlands-99815.herokuapp.com';
questionsApiBaseUrl = 'http://localhost:4567';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import { Button } from 'react-bootstrap';

import { PageHeader } from 'react-bootstrap';
import Questions from './questions.jsx';
import QuestionForm from './question_form.jsx';
import SearchBox from './search_box.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {questions: []};
    this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
    this.handleQuestionRequest = this.handleQuestionRequest.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleQuestionUpdate(title, answer, distractors, id) {
    let existingQuestions = this.state.questions;

    if (id !== undefined) {
      this.updateQuestion(id, title, answer, distractors);
    } else {
      this.createQuestion(title, answer, distractors);
    }
  }

  handleQuestionRequest(id) {
    console.log('Question requested', id);
    let updatedQuestions = this.state.questions.slice();
    axios.get(`${questionsApiBaseUrl}/questions/${id}`)
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
    axios.post(`${questionsApiBaseUrl}/questions`, {
      title: title,
      answer: answer,
      distractors: distractors
    })
    .then(response => {
      let location = response.headers.location;
      this.handleQuestionRequest(location.match(/\d+$/)[0]);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateQuestion(id, title, answer, distractors) {
    axios.patch(`${questionsApiBaseUrl}/questions/${id}`, {
      id: id,
      title: title,
      answer: answer,
      distractors: distractors
    })
    .then(response => {
      this.handleQuestionRequest(response.data.id);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleSearchRequest(term) {
    console.log('searching for term', term);
    axios.get(`${questionsApiBaseUrl}/questions?search=${term.toLowerCase()}`)
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

  handleSort() {
    console.log('sorting');
    axios.get(`${questionsApiBaseUrl}/questions?sort=title`)
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

  componentDidMount() {
    axios.get(`${questionsApiBaseUrl}/questions`)
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
        <Button bsStyle="link" onClick={this.handleSort}>Sort by Title</Button>
        <SearchBox onSearch={this.handleSearchRequest} />
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
