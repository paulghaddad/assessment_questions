const React = require('react');

class Question extends React.Component {
  render() {
    return <li>{this.props.question.title}</li>
  }
}

module.exports = Question
