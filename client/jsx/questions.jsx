const React = require('react');
const Question = require('./question.jsx');

class Questions extends React.Component {
  render() {
    return (
      <ul>
        {Object.keys(this.props.questions).map(question => {
          return <Question onCreateNewQuestion={this.props.onCreateNewQuestion} key={question} question={this.props.questions[question]} />
        })}
      </ul>
    )
  }
}

module.exports = Questions
