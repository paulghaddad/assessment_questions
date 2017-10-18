const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Questions = require('./questions.jsx');

const AppTitle = () => {
  return <h1>All Questions</h1>
};

const AppDescription = () => {
  return <p>Click on a question to see its possible answers</p>
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {questions: []};
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
        <AppTitle />
        <AppDescription />
        <Questions questions={this.state.questions} />
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
